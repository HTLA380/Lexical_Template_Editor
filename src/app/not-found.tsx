import { ScrollText } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <ScrollText size={40} className="text-red-500" />
      <p className="text-red-600">Page not found</p>
      <Link
        className="mt-3 rounded-md bg-gray-800 px-3 py-2 text-sm text-white"
        href={"/template"}>
        Go Back To The Templates List
      </Link>
    </main>
  );
};

export default NotFound;
