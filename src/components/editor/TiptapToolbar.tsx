import { type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Redo,
  Undo,
  Italic,
  Underline,
} from "lucide-react";
import React from "react";
import IconButton from "../button/IconButton";

interface Props {
  editor: Editor | null;
}

const TiptapToolbar: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex items-center justify-center gap-2 border-b border-gray-300 bg-white py-2 shadow-sm">
      <IconButton
        icon={<Undo size={15} />}
        onClickEvent={() => editor.chain().focus().undo().run()}
      />
      <IconButton
        icon={<Redo size={15} />}
        onClickEvent={() => editor.chain().focus().redo().run()}
      />

      <div className="mx-1 h-6 w-px bg-gray-300"></div>

      <IconButton
        icon={<Bold size={15} />}
        onClickEvent={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      />
      <IconButton
        icon={<Italic size={15} />}
        onClickEvent={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      />
      <IconButton
        icon={<Underline size={15} />}
        onClickEvent={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      />
      <IconButton
        icon={<Code size={15} />}
        onClickEvent={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
      />

      <div className="mx-1 h-6 w-px bg-gray-300"></div>

      <IconButton
        icon={<AlignLeft size={15} />}
        onClickEvent={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive("alignLeft")}
      />
      <IconButton
        icon={<AlignCenter size={15} />}
        onClickEvent={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive("alignCenter")}
      />
      <IconButton
        icon={<AlignRight size={15} />}
        onClickEvent={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive("alignRight")}
      />
      <IconButton
        icon={<AlignJustify size={15} />}
        onClickEvent={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
        isActive={editor.isActive("alignJustify")}
      />

      <div className="mx-1 h-6 w-px bg-gray-300"></div>
    </div>
  );
};

export default TiptapToolbar;
