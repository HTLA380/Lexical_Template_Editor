"use client";

import { EditorContent } from "@tiptap/react";
import TiptapToolbar from "./TiptapToolbar";
import { useEditorContext } from "@/context/EditorContext";
import { Suspense } from "react";
import Loading from "@/app/loading";

const Tiptap = () => {
  const editor = useEditorContext();

  return (
    <>
      <TiptapToolbar editor={editor} />
      <Suspense fallback={<Loading />}>
        <EditorContent editor={editor} />
      </Suspense>
    </>
  );
};

export default Tiptap;
