"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";
import { getUserData } from "@/lib/supabase/user";

type Book = Database["public"]["Tables"]["books"]["Row"];

export default function BooksPage() {

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Upload form state
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // ✅ Fetch books from table
  useEffect(() => {
    const fetchBooks = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("books") // <-- must exist in Supabase
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching books:", error.message);
      } else {
        setBooks((data as Book[]) || []);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  // ✅ Upload handler
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !subject || !classLevel) {
      alert("Please fill all fields and choose a file.");
      return;
    }

    setUploading(true);
    const supabase = createClient();

    try {
      // Storage path: /class-{n}/{subject}.pdf
      const filePath = `/class-${classLevel}/${subject}.pdf`;
      await getUserData(supabase)

      // Upload to storage bucket "books_pdf"
      const { error: uploadError } = await supabase.storage
        .from("books_pdf")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      // const { data: publicData } = supabase.storage
      //   .from("books_pdf")
      //   .getPublicUrl(filePath);

      // const pdfUrl = publicData.publicUrl;

      // Insert into "books" table
      // const { error: insertError } = await supabase.from("books").insert({
      //   title,
      //   subject,
      //   class_level: `class-${classLevel}`,
      //   pdf_url: pdfUrl,
      //   supabase_path: filePath,
      //   is_public: true,
      // } as InsertBook);

      // if (insertError) throw insertError;

      alert("Book uploaded successfully!");

      // Reset form
      setTitle("");
      setSubject("");
      setClassLevel("");
      setFile(null);

      // Refresh book list
      const { data: newBooks } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });
      setBooks((newBooks as Book[]) || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      console.error("Upload failed:", errorMessage);
      alert("Error uploading book.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading books...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Books
      </h1>
      
      {/* ✅ Upload Form */}
      <form
        onSubmit={handleUpload}
        className="mb-8 p-6 border rounded-lg bg-white dark:bg-gray-800 shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Upload a New Book</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Subject (e.g. Math)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Class Level (e.g. 5)"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-lg shadow hover:scale-105 transition"
        >
          {uploading ? "Uploading..." : "Upload Book"}
        </button>
      </form>

      {/* ✅ Show Books */}
      {books.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="border rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800"
            >
              {/* <Image src={book.thumbnail_url} alt="" height={50} width={100} /> */}
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Subject: {book.subject}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Class: {book.class_level}
              </p>
              {book.pdf_url ? (
                <a
                  href={book.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  View PDF
                </a>
              ) : (
                <span className="text-gray-500 italic">No PDF available</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
