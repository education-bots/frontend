import { TypedSupabaseClient } from "@/lib/supabase/client";

export function getCurrentUser(client: TypedSupabaseClient) {
  return client.auth.getUser();
}

export async function getUserData(supabase: TypedSupabaseClient) {
  const { data, error } = await supabase.auth.getUser();
  if (!data || error) {
    console.error("Error fetching user data", error);
    throw new Error("User not found");
  }

  return data.user;
}
