"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { useLocalStorageContext } from "@/context/LocalStorageContext";
import { findPlaceholders, replaceVariables } from "@/util/templateUtils";
import { TemplateType } from "@/types/templateTypes";

// ==========================================================================

interface FillDataProps {
  params: { id: string };
}

const FillData: React.FC<FillDataProps> = ({ params }) => {
  const { findTemplate, updateTemplate } = useLocalStorageContext();
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType | null>(
    null,
  );
  const router = useRouter();
  const htmlElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTemplate = findTemplate(params.id);
    if (currentTemplate) {
      setCurrentTemplate(currentTemplate);
      setHtmlContent(currentTemplate.editorContent);
    }

    if (htmlElementRef.current) {
      htmlElementRef.current.innerHTML = currentTemplate?.editorContent || "";
    }
  }, [params.id, currentTemplate]);

  useEffect(() => {
    const updatedContent = replaceVariables(
      inputValues,
      currentTemplate?.editorContent || "",
    );
    setHtmlContent(updatedContent);
  }, [inputValues]);

  useEffect(() => {
    if (htmlElementRef.current) {
      htmlElementRef.current.innerHTML = htmlContent || "";
    }
  }, [htmlContent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const saveFilledTemplate = () => {
    if (!currentTemplate) return;

    const filledTemplateObject: TemplateType = {
      ...currentTemplate,
      title: currentTemplate.title,
      editorContent: htmlContent,
      createAt: currentTemplate.createAt,
    };

    updateTemplate(filledTemplateObject, params.id);
    router.push("/template");
  };

  const placeholders = findPlaceholders(currentTemplate?.editorContent || "");

  return (
    <main className="flex min-h-screen w-full items-center bg-slate-200">
      <div className="h-screen w-1/2 p-8">
        <div className="h-full w-full rounded-md bg-white p-5">
          <div ref={htmlElementRef} />
        </div>
      </div>
      <div className="flex h-screen w-1/2 items-center justify-center p-8">
        <div className="relative h-full max-h-96 w-full max-w-xl rounded-lg border bg-white p-3">
          <h3 className="text-center text-xl font-semibold">Form</h3>
          {placeholders.length > 0 ? (
            placeholders.map((placeholder) => (
              <div className="mb-3" key={placeholder}>
                <p className="mb-1.5 text-sm text-gray-700">{placeholder}</p>
                <input
                  className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 text-sm"
                  name={placeholder}
                  placeholder={placeholder}
                  onChange={handleInputChange}
                />
              </div>
            ))
          ) : (
            <p className="mt-28 text-center text-sm font-semibold text-red-500">
              No Variable Provided
            </p>
          )}

          <button
            onClick={saveFilledTemplate}
            className="absolute bottom-3 right-3 rounded-xl bg-gray-800 p-2 text-white hover:bg-gray-700">
            <Save />
          </button>
        </div>
      </div>
    </main>
  );
};

export default FillData;
