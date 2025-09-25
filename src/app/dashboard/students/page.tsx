"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Students</h1>
      <p className="text-gray-500">
        Manage your students and track their progress.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Jane Doe – Class 10</li>
            <li>John Smith – Class 9</li>
            <li>Aisha Khan – Class 11</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
