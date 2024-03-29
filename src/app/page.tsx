"use client";

import React from "react";
import Link from "next/link";

// =================================================================

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-yellow-50 p-5 pt-28">
      <h1 className="mb-3 text-xl font-semibold sm:text-2xl md:text-3xl">
        TipTap Template Editor Using TailwindCss
      </h1>
      <Link
        href={"/template"}
        className="rounded-md border border-gray-800 bg-white px-4 py-2 text-sm">
        View Templates
      </Link>
    </div>
  );
};

export default Home;
