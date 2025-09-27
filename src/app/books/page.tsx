// app/books/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Define Book type locally
type Book = {
  id: string;
  title: string;
  subject: string;
  class_level: string;
  pdf_url: string | null;
  created_at: string | null;
  is_public: boolean | null;
  storage_object_id: string | null;
  supabase_path: string | null;
  uploaded_by: string | null;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("books")
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading books...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Books
      </h1>

      {books.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="border rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800"
            >
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
