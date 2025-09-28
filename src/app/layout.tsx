import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
 
 
 
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "AI Companion - Your Study Assistant",
  description: "Powered by GIAIC team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"
      >
        <Navbar />
        {/* Main content grows to push footer down */}
        <main className="flex-grow mt-10">{children}</main>
        <Footer />

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
