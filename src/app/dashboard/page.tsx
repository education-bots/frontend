import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <Card className="shadow-md border-0 rounded-xl">
      <CardHeader>
        <CardTitle>Dashboard Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          This is your main dashboard. Use the sidebar to navigate to your
          courses, analytics, or management features.
        </p>
      </CardContent>
    </Card>
  );
}
