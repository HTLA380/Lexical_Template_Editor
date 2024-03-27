"use client";

import { useLocalStorageContext } from "@/context/LocalStorageContext";
import { TemplateType } from "@/types/templateTypes";
import { saveDataToLocalStorage } from "@/util/localStorageUtil";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface FillDataProps {
  params: { id: string };
}

// ============================================================

const FillData: React.FC<FillDataProps> = ({ params }) => {
  const { templates } = useLocalStorageContext();
  const [originalHtmlContent, setOriginalHtmlContent] = useState<string>("");
  const [modifiedHtmlContent, setModifiedHtmlContent] = useState<string>("");
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [template, setTemplate] = useState<TemplateType | null>(null); // Add template state
  const router = useRouter();

  const findPlaceholders = (content: string) => {
    const regex = /{{(.*?)}}/g;
    let matches;
    const placeholders = [];
    while ((matches = regex.exec(content)) !== null) {
      placeholders.push(matches[1]);
    }
    return placeholders;
  };

  const replaceVariables = (content: string) => {
    const placeholders = findPlaceholders(content);
    return placeholders.reduce((acc, placeholder) => {
      const regex = new RegExp(`{{${placeholder}}}`);
      const value = inputValues[placeholder] || "";
      return acc.replace(regex, value);
    }, content);
  };

  useEffect(() => {
    const foundTemplate = templates?.find((t) => t.id === params.id) || null;
    setTemplate(foundTemplate); // Update the template state

    if (foundTemplate) {
      setOriginalHtmlContent(foundTemplate.editorContent);
      setModifiedHtmlContent(foundTemplate.editorContent);
    }
  }, [templates, params.id, template]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    updateContent();
  }, [inputValues]);

  const updateContent = () => {
    const replacedContent = replaceVariables(originalHtmlContent);
    setModifiedHtmlContent(replacedContent); // Update the modified content with replaced variables
  };

  const saveFilledTemplate = () => {
    const template =
      templates?.find((template) => template.id === params.id) || null;

    if (!template) return;

    const updatedTemplate: TemplateType = {
      ...template,
      title: template.title,
      editorContent: modifiedHtmlContent,
      createAt: template.createAt,
    };

    const updatedTemplates: TemplateType[] = templates || [];
    const templateIndex: number = updatedTemplates.findIndex(
      (t) => t.id === params.id,
    );

    if (templateIndex !== -1) {
      updatedTemplates[templateIndex] = updatedTemplate;
      saveDataToLocalStorage("templates", updatedTemplates);
      router.push("/");
    }
  };

  const placeholders = findPlaceholders(originalHtmlContent);

  return (
    <main className="flex min-h-screen w-full items-center bg-slate-200">
      <div className="h-screen w-1/2 p-8">
        <div className="h-full w-full rounded-md bg-white p-5">
          <div dangerouslySetInnerHTML={{ __html: modifiedHtmlContent }} />
        </div>
      </div>
      <div className="flex h-screen w-1/2 items-center justify-center p-8">
        <div className="relative h-full max-h-96 w-full max-w-xl rounded-lg border bg-white p-3">
          <h3 className="text-center text-xl font-semibold">Form</h3>
          {placeholders.map((placeholder) => (
            <div className="mb-3" key={placeholder}>
              <p className="mb-1.5 text-sm text-gray-700">{placeholder}</p>
              <input
                className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 text-sm"
                name={placeholder}
                placeholder={placeholder}
                onChange={handleInputChange}
              />
            </div>
          ))}

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
