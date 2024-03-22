"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Output = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const savedHtmlContent = localStorage.getItem("editorContent");
    if (savedHtmlContent) {
      setHtmlContent(JSON.parse(savedHtmlContent));
    }
  }, []);
  return (
    <>
      <div></div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <div className="flex items-center gap-2">
        <Link
          href={"/"}
          className="mt-5 block w-fit rounded-md bg-blue-400 px-4 py-2 text-white"
        >
          Edit
        </Link>
        <Link
          href={"/filldata"}
          className="mt-5 block w-fit rounded-md bg-gray-800 px-4 py-2 text-white"
        >
          Fill Data
        </Link>
      </div>
    </>
  );
};

export default Output;
