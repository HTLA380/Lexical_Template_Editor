"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapToolbar from "./TiptapToolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { templateContent } from "./TemplateContent";

const Tiptap = () => {
  const [content, setContent] = useState<string>(""); // Assuming you have your content in a string variable

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        alignments: ["left", "right", "center", "justify"],
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
    ],
    content: content,
  });

  useEffect(() => {
    if (editor) {
      const savedContent = localStorage.getItem("editorContent");
      if (savedContent) {
        setContent(JSON.parse(savedContent));
      }
      editor.commands.setContent(content || templateContent);
    }
  }, [editor, content]);

  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2000);

  useEffect(() => {
    if (debouncedEditor) {
      localStorage.setItem("editorContent", JSON.stringify(editor?.getHTML()));
    }
  }, [debouncedEditor]);

  return (
    <>
      <TiptapToolbar editor={editor} />
      {/* <Editor contentComponent={content} /> */}
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
