import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserData(supabase: SupabaseClient<Database>) {
  // Fetch user from Supabase
  const { data, error } = await supabase.auth.getUser();
  if (!data || error) {
    console.error("Error fetching user data", error);
    throw new Error("User not found");
  }

  const { data: userData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  return { auth: data.user, user: userData };
}
