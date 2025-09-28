"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { GraduationCap, School } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Database } from "@/types/database.types";

export default function OnboardingPage() {

  const [role, setRole] = useState("student");
  const [studentRollNo, setStudentRollNo] = useState("");
  const [language, setLanguage] = useState("Urdu");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const roles = [
    { value: "student", label: "Student", icon: GraduationCap },
    { value: "teacher", label: "Teacher", icon: School },
  ];

  const languages = ["Urdu", "English", "Arabic", "French", "Chinese"];

  const handleSubmit = async () => {
    if (!role) {
      toast.error("Please select a role");
      return;
    }

    if (role === "parent" && !studentRollNo) {
      toast.error("Please enter your child's roll number");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error("User not logged in");

      const payload: Database["public"]["Tables"]["profiles"]["Insert"] = {
        id: user.id,
        class_level: "unassigned",
        role,
        date_of_birth: dob || null,
        language_preference: language,
        metadata: role === "parent" ? { student_roll_no: studentRollNo } : null,
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      toast.success(`Welcome! You are onboarded as ${role}`);
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : JSON.stringify(err, null, 2);
      toast.error(message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4">
      <Card className="w-full max-w-lg shadow-xl border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Step {step} of 3
          </CardTitle>
          <p className="text-center text-gray-500 text-sm mt-1">
            {step === 1 && "Choose your role"}
            {step === 2 && "Select your preferences"}
            {step === 3 && "Confirm your details"}
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 3) {
                setStep(step + 1);
              } else {
                handleSubmit();
              }
            }}
            className="space-y-6"
          >
            {step === 1 && (
              <div className="grid grid-cols-2 gap-4">
                {roles.map(({ value, label, icon: Icon }) => (
                  <div
                    key={value}
                    role="button"
                    tabIndex={0}
                    onClick={() => setRole(value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setRole(value);
                    }}
                    className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md ${
                      role === value
                        ? "border-2 border-indigo-600 bg-indigo-50"
                        : "border-gray-200"
                    }`}
                  >
                    <Icon
                      size={32}
                      className={`${
                        role === value ? "text-indigo-600" : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        role === value ? "text-indigo-600" : "text-gray-700"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <>
                {role === "parent" && (
                  <Input
                    type="text"
                    placeholder="Enter Student Roll No"
                    value={studentRollNo}
                    onChange={(e) => setStudentRollNo(e.target.value)}
                    required
                  />
                )}

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    Preferred Language
                  </label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    Date of Birth (optional)
                  </label>
                  <Input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Role:</strong> {role}
                </p>
                {role === "parent" && (
                  <p>
                    <strong>Student Roll No:</strong> {studentRollNo}
                  </p>
                )}
                <p>
                  <strong>Language:</strong> {language}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {dob || "Not provided"}
                </p>
              </div>
            )}

            <div className="flex justify-between gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-medium shadow hover:opacity-90 rounded-xl"
              >
                {loading ? "Saving..." : step < 3 ? "Next" : "Finish"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
