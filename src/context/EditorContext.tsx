"use client";

// editorContext.tsx
import React, { createContext, useContext } from "react";

import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

const EditorContext = createContext<Editor | null>(null);

interface EditorProviderProps {
  children: React.ReactNode;
}

// EditorProvider component
export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "right", "center", "justify"],
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
    ],
    content: "Tiptap template editor",
  });

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
};

export const useEditorContext = () => useContext(EditorContext);
