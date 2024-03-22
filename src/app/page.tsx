import React from "react";
import Tiptap from "../components/editor/Tiptap";
import Link from "next/link";
// import TiptapToolbar from "../components/editor/TiptapToolbar";

const Home = () => {
  return (
    <main className="bg-slate-100 px-5 pb-10 pt-20">
      <Tiptap />
      <Link
        href="/output"
        className="fixed bottom-11 right-12 rounded-md bg-blue-500 px-3 py-1.5 text-white"
      >
        Output
      </Link>
    </main>
  );
};

export default Home;
