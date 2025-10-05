import { TypedSupabaseClient } from "@/lib/supabase/client";
import { ProfileFormSchema, ChangePasswordSchema } from "./schema";

export async function getProfile(supabase: TypedSupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  console.log(data)
  if (!data || error) {
    console.error("Error fetching user profile", error);
    throw new Error("Error fetching user profile");
  }

  return data;
}

export async function updateProfile(supabase: TypedSupabaseClient, data: ProfileFormSchema) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: data.full_name,
    class_level: data.class_level,
    date_of_birth: data.date_of_birth || null,
  });

  if (error) throw error;
  return { success: true };
}

export async function changePassword(supabase: TypedSupabaseClient, data: ChangePasswordSchema) {
  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
  });

  if (error) throw error;
  return { success: true };
}

export async function signOut(supabase: TypedSupabaseClient) {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return { success: true };
}
