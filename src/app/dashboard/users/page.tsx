"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      <p className="text-gray-500">
        Admins can manage all platform users here.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center py-2 border-b">
            <span>Jane Doe (Student)</span>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span>Mr. Smith (Teacher)</span>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Admin John</span>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
