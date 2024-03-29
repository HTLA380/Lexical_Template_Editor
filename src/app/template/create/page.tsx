"use client";

import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";

import Tiptap from "@/components/editor/Tiptap";
import { useEditorContext } from "@/context/EditorContext";
import { getCurrentDateTime } from "@/util/dateUtil";
import { useLocalStorageContext } from "@/context/LocalStorageContext";
import Button from "@/components/button/Button";

// =====================================================================

const CreateTemplate = () => {
  const editor = useEditorContext();
  const router = useRouter();
  const { templates, saveTemplate } = useLocalStorageContext();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [documentName, setDocumentName] = useState<string>("");

  // setting the initial data as soon as the editor ready
  useEffect(() => {
    if (editor) {
      editor.commands.setContent("<p>Create Template</p>");
    }
  }, [editor]);

  const saveDocument = () => {
    if (!editor || editor.state.doc.content.childCount === 0) return;

    const title = documentName || `Document ${templates?.length || ""}`;

    saveTemplate(title, editor.getHTML(), getCurrentDateTime());
    router.push("/template");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const saveModalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex h-fit w-full max-w-md flex-col gap-3 rounded-md bg-white p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Save Template</h3>
          <button onClick={handleModalClose} className="hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        <input
          value={documentName}
          required
          onChange={(e) => setDocumentName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          placeholder="file name"
        />
        <div className="flex items-center justify-end gap-3">
          <Button onClick={handleModalClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={saveDocument}>Save</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative bg-slate-100 px-5 pb-10 pt-20">
      <Tiptap />

      <Button
        onClick={() => setShowModal(true)}
        variant="outline"
        className="fixed bottom-5 right-10 z-10 shadow-sm">
        <Save />
      </Button>

      {showModal && saveModalContent}
    </div>
  );
};

export default CreateTemplate;
