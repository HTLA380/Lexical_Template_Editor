import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EditorProvider } from "@/context/EditorContext";
import { LocalStorageProvider } from "@/context/LocalStorageContext";

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
        <LocalStorageProvider>
          <body className={inter.className}>{children}</body>
        </LocalStorageProvider>
      </EditorProvider>
    </html>
  );
}
