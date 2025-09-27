"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      <p className="text-gray-500">Update your personal information.</p>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input name="name" type="text" placeholder="Your Name" />
            <Input name="class" type="text" placeholder="Your Class" />
            <Input name="dob" type="date" />
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
