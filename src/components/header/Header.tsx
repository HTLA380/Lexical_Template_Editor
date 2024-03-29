import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 bg-yellow-50 shadow-sm">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5">
        <h1>Tiptap Template Editor</h1>
        <div className="flex items-center gap-2 ">
          <Link
            href={`/template`}
            className="rounded-md border border-gray-800 bg-gray-800 px-4 py-1.5 text-sm text-white transition-colors hover:bg-transparent hover:text-black">
            Template List
          </Link>
          <Link
            href="/template/create"
            className="rounded-md border border-gray-800 bg-yellow-100 px-3 py-2 text-sm text-gray-900 shadow-sm hover:bg-yellow-200">
            Create New Template
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
