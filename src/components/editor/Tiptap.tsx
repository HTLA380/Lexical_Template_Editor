"use client";

import { EditorContent } from "@tiptap/react";
import TiptapToolbar from "./TiptapToolbar";
import { useEditorContext } from "@/context/EditorContext";

const Tiptap = () => {
  const editor = useEditorContext();

  return (
    <>
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
