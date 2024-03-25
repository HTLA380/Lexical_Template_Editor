"use client";

import { useEditorContext } from "@/context/EditorContext";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Save, X } from "lucide-react";
import Tiptap from "@/components/editor/Tiptap";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "@/util/localStorageUtil";

const CreateTemplate = () => {
  const editor = useEditorContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [documentName, setDocumentName] = useState<string>("");

  useEffect(() => {
    if (editor) {
      editor.commands.setContent("<p>Create Template</p>");
    }
  }, [editor]);

  const saveDocument = () => {
    // do nothing if the editor doesn't exist or if the editor content is empty
    if (!editor || editor.state.doc.content.childCount === 0) return;

    const storedData = getDataFromLocalStorage("templates");

    const parsedData = storedData ? JSON.parse(storedData) : [];

    const newDocument = {
      id: uuidv4(),
      title: documentName || "document",
      editorContent: editor.getHTML(),
    };

    parsedData.push(newDocument);

    const updatedJsonString = JSON.stringify(parsedData);

    saveDataToLocalStorage("templates", updatedJsonString);
  };

  const saveModal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex h-fit w-full max-w-md flex-col gap-3 rounded-md bg-white p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Save Template</h3>
          <button
            onClick={() => setShowModal(false)}
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
          <button
            onClick={() => setShowModal(false)}
            className="w-fit rounded-md border border-gray-800 bg-transparent px-4 py-2 text-sm text-black hover:bg-gray-200">
            Cancel
          </button>
          <button
            onClick={saveDocument}
            className="w-fit rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800">
            Save
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative bg-slate-100 px-5 pb-10 pt-20">
      <Tiptap />

      <button
        onClick={() => setShowModal(true)}
        title="save"
        className="fixed bottom-5 right-10 z-10 rounded-md border border-gray-900 bg-white p-2 text-sm text-gray-900 shadow-sm transition-colors hover:bg-gray-200">
        <Save />
      </button>

      {showModal && saveModal}
    </div>
  );
};

export default CreateTemplate;
