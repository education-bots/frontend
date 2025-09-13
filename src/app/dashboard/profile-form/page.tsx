"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

interface Profile {
  full_name?: string;
  class?: string;
  age?: number | string;
}

export default function ProfileForm({ profile }: { profile: Profile }) {
  const supabase = createClient();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [userClass, setUserClass] = useState(profile?.class || "");
  const [age, setAge] = useState(profile?.age || "");

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      class: userClass,
      age: age ? Number(age) : null,
      updated_at: new Date().toISOString(),
    });
    if (error) return alert(error.message);
    alert("Profile updated!");
  }

  async function changePassword() {
    const newPass = prompt("Enter new password:");
    if (!newPass) return;
    const { error } = await supabase.auth.updateUser({ password: newPass });
    if (error) return alert(error.message);
    alert("Password changed!");
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  return (
    <form onSubmit={saveProfile} className="flex flex-col gap-2">
      <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full name" className="border p-2" />
      <input value={userClass} onChange={e=>setUserClass(e.target.value)} placeholder="Class" className="border p-2" />
      <input type="number" value={age} onChange={e=>setAge(e.target.value)} placeholder="Age" className="border p-2" />
      <button type="submit" className="bg-green-600 text-white py-2 rounded">Save Profile</button>

      <div className="flex gap-2 mt-4">
        <button type="button" onClick={changePassword} className="bg-yellow-500 text-white py-2 px-4 rounded">Change Password</button>
        <button type="button" onClick={signOut} className="bg-red-500 text-white py-2 px-4 rounded">Sign Out</button>
      </div>
    </form>
  );
}
