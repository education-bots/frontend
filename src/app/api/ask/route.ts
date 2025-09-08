// app/api/ask/route.ts
import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(req: Request) {
  const { message } = await req.json();
  const scriptPath = path.join(process.cwd(), "..", "backend", "main.py");

  return new Promise((resolve) => {
    const py = spawn("python", [scriptPath, message]);
    let output = "";

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    py.on("close", () => {
      resolve(NextResponse.json({ reply: output.trim() }));
    });
  });
}
