import { TypedSupabaseClient } from "@/lib/supabase/client";
import { BookUploadSchema } from "./schema";

export async function uploadBook(supabase: TypedSupabaseClient, data: BookUploadSchema) {
  const { title, subject, class_level, file } = data;
  
  // Get user data for authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  // Storage path: /class-{n}/{subject}.pdf
  const filePath = `/class-${class_level}/${subject}.pdf`;

  // Upload to storage bucket "books_pdf"
  const { error: uploadError } = await supabase.storage
    .from("books_pdf")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: publicData } = supabase.storage
    .from("books_pdf")
    .getPublicUrl(filePath);

  const pdfUrl = publicData.publicUrl;

  // Insert into "books" table
  const { error: insertError } = await supabase.from("books").insert({
    title,
    subject,
    class_level: `class-${class_level}`,
    pdf_url: pdfUrl,
    supabase_path: filePath,
    is_public: true,
  });

  if (insertError) throw insertError;

  return { success: true, pdfUrl };
}

export async function getBooks(supabase: TypedSupabaseClient) {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}
