"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
      <p className="text-gray-500">
        Here you’ll see your enrolled or assigned courses.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mathematics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Introduction to Algebra and Geometry</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Science</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Physics and Chemistry basics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
