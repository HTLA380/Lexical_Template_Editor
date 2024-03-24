import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-gray-900 pb-5">
        <h1>Lexical Template</h1>
        <div className="flex items-center gap-2 ">
          <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white shadow-sm transition-colors hover:bg-gray-700">
            Template List
          </button>
          <Link
            href={"/create-template"}
            className="rounded-md border border-gray-800 bg-transparent px-3 py-2 text-sm text-gray-900 shadow-sm hover:bg-gray-300"
          >
            Create New Template
          </Link>
        </div>
      </nav>
      <main className="mx-auto mt-5 flex min-h-screen w-full max-w-6xl justify-center">
        Currently, no template was made yet. Please create one first.
      </main>
    </div>
  );
};

export default Home;
