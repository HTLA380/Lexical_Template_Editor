import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EditorProvider } from "@/context/EditorContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tiptap Template Editor",
  description: "Tiptap template editor using next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <EditorProvider>
        <body className={inter.className}>{children}</body>
      </EditorProvider>
    </html>
  );
}
