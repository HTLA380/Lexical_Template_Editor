"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import Tiptap from "@/components/editor/Tiptap";
import { useRouter } from "next/navigation";

import { useEditorContext } from "@/context/EditorContext";
import { useLocalStorageContext } from "@/context/LocalStorageContext";
import { TemplateType } from "@/types/templateTypes";
import Button from "@/components/button/Button";
import NotFound from "@/app/not-found";
import Loading from "@/app/loading";

// =====================================================================

interface EditTemplateInterface {
  params: { id: string };
}
const EditTemplate: React.FC<EditTemplateInterface> = ({ params }) => {
  const { updateTemplate, findTemplate } = useLocalStorageContext();
  const editor = useEditorContext();
  const router = useRouter();

  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [documentName, setDocumentName] = useState<string>("");

  // adding initial values as soon as editor ready
  useEffect(() => {
    if (!editor) return;

    const template = findTemplate(params.id);

    if (template) {
      setCurrentTemplate(template);
      setDocumentName(template.title);
      editor.commands.setContent(template.editorContent);
    }
  }, [editor]);

  const saveUpdatedDocument = () => {
    // do nothing if the editor doesn't have any elements
    if (!editor || editor.state.doc.content.childCount === 0) return;

    if (!currentTemplate) return;
    const updatedTemplateObject: TemplateType = {
      ...currentTemplate,
      title: documentName || currentTemplate.title,
      editorContent: editor.getHTML(),
    };

    updateTemplate(updatedTemplateObject, params.id);
    router.push("/template");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="relative bg-slate-100 px-5 pb-10 pt-20">
      <Tiptap />

      <Button
        onClick={() => setShowModal(true)}
        variant="outline"
        className="fixed bottom-5 right-10 z-10 shadow-sm">
        <Save />
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex h-fit w-full max-w-md flex-col gap-3 rounded-md bg-white p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Save Template</h3>
              <button
                onClick={handleModalClose}
                className="hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            <input
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              placeholder="file name"
            />
            <div className="flex items-center justify-end gap-3">
              <Button onClick={handleModalClose} variant="outline">
                Cancel
              </Button>
              <Button onClick={saveUpdatedDocument}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTemplate;
