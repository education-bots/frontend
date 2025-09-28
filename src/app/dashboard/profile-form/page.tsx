"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

interface Profile {
  full_name?: string;
  class_level?: string;
  date_of_birth?: string;
}

export default function ProfileForm({ profile }: { profile: Profile }) {
  const supabase = createClient();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [userClass, setUserClass] = useState(profile?.class_level || "");
  const [dateOfBirth, setDateOfBirth] = useState(profile?.date_of_birth || "");

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      class_level: userClass,
      date_of_birth: dateOfBirth || null,
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
      <input value={userClass} onChange={e=>setUserClass(e.target.value)} placeholder="Class Level (e.g. class-5)" className="border p-2" />
      <input type="date" value={dateOfBirth} onChange={e=>setDateOfBirth(e.target.value)} placeholder="Date of Birth" className="border p-2" />
      <button type="submit" className="bg-green-600 text-white py-2 rounded">Save Profile</button>

      <div className="flex gap-2 mt-4">
        <button type="button" onClick={changePassword} className="bg-yellow-500 text-white py-2 px-4 rounded">Change Password</button>
        <button type="button" onClick={signOut} className="bg-red-500 text-white py-2 px-4 rounded">Sign Out</button>
      </div>
    </form>
  );
}
