"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Security</h1>
      <p className="text-gray-500">Update your password and security options.</p>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input
              name="password"
              type="password"
              placeholder="New Password"
              required
            />
            <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Add an extra layer of security to your account.
          </p>
          <Button variant="outline" className="w-full">
            Enable 2FA
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
