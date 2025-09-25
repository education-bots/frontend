"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
      <p className="text-gray-500">Manage system-wide preferences.</p>

      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Platform Name" defaultValue="AI Learning" />
          <Input placeholder="Support Email" defaultValue="support@edubot.com" />
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
