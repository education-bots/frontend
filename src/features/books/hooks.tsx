"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useSupabaseBrowser from "@/lib/supabase/client";
import { uploadBook, getBooks } from "./queries";
import type { BookUploadSchema } from "./schema";

export const useBooks = () => {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(supabase),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const uploadMutation = useMutation({
    mutationFn: (data: BookUploadSchema) => uploadBook(supabase, data),
    onSuccess: () => {
      toast.success("Book uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload book");
    },
  });

  return {
    books: booksQuery.data || [],
    isLoading: booksQuery.isLoading,
    refetch: booksQuery.refetch,
    uploadBook: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
  };
};
