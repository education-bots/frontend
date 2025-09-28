import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserData(supabase: SupabaseClient) {
  // Fetch user from Supabase
  const { data, error } = await supabase.auth.getUser();
  if (!data || error) {
    console.error("Error fetching user data", error);
    throw new Error("User not found");
  }

  return data.user;
}
