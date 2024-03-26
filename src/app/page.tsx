"use client";

import React from "react";
import Link from "next/link";
import { useLocalStorageContext } from "@/context/LocalStorageContext";

const Home = () => {
  const { templates } = useLocalStorageContext();

  const placeHolder = (
    <p>Currently, no template was made yet. Please create one first.</p>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-gray-900 pb-5">
        <h1>Lexical Template</h1>
        <div className="flex items-center gap-2 ">
          <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white shadow-sm transition-colors hover:bg-gray-700">
            Template List
          </button>
          <Link
            href={"template/create"}
            className="rounded-md border border-gray-800 bg-transparent px-3 py-2 text-sm text-gray-900 shadow-sm hover:bg-gray-300">
            Create New Template
          </Link>
        </div>
      </nav>
      <main className="mx-auto mt-5  flex min-h-screen w-full max-w-6xl flex-col items-center gap-5">
        {templates
          ? templates.map((template) => (
              <div
                key={template.id}
                className="flex w-full items-center justify-between rounded-md border border-gray-800 px-3 py-3">
                <div className="text-sm">
                  <p>{template.title}</p>
                  <p className="text-gray-600">
                    Created At {template.createAt}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Link
                    className="rounded-md border border-gray-800 bg-gray-800 px-4 py-1.5 text-sm text-white transition-colors hover:bg-transparent hover:text-black"
                    href={`/template/edit/${template.id}`}>
                    Edit
                  </Link>
                  <Link
                    className="rounded-md border border-gray-800 bg-transparent px-4 py-1.5 text-sm text-black transition-colors hover:bg-gray-800 hover:text-white"
                    href={`/template/edit/${template.id}`}>
                    Fill Template
                  </Link>
                </div>
              </div>
            ))
          : placeHolder}
      </main>
    </div>
  );
};

export default Home;
