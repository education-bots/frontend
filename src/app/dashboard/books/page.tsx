"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookUploadSchema, BookUploadSchema } from "@/features/books/schema";
import { useBooks } from "@/features/books/hooks";

export default function BooksPage() {
  const { books, isLoading, uploadBook, isUploading } = useBooks();

  const form = useForm<BookUploadSchema>({
    resolver: zodResolver(bookUploadSchema),
    defaultValues: {
      title: "",
      subject: "",
      class_level: "",
      file: undefined,
    },
  });

  const onSubmit = async (data: BookUploadSchema) => {
    try {
      await uploadBook(data);
      form.reset();
    } catch (error) {
      console.error("Failed to upload book:", error);
    }
  };

  if (isLoading) {
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
      
      {/* Upload Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload a New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Book Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject (e.g. Math)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="class_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Level</FormLabel>
                      <FormControl>
                        <Input placeholder="Class Level (e.g. 5)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>PDF File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => onChange(e.target.files?.[0])}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
              >
                {isUploading ? "Uploading..." : "Upload Book"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Show Books */}
      {books.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="p-4">
              <CardHeader>
                <CardTitle className="text-xl">{book.title}</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
