"use client";

import { TemplateType } from "@/types/templateTypes";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "@/util/localStorageUtil";
import { v4 as uuidv4 } from "uuid";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LocalStorageContextInterface {
  templates: TemplateType[];
  setTemplates: React.Dispatch<React.SetStateAction<TemplateType[] | []>>;
  findTemplate: (id: string) => TemplateType | null;
  updateTemplate: (htmlContent: string, id: string) => void;
  saveTemplate: (title: string, content: string, createAt: string) => void;
}

const LocalStorageContext = createContext<LocalStorageContextInterface>({
  templates: [],
  setTemplates: () => {},
  findTemplate: () => null,
  updateTemplate: () => {},
  saveTemplate: () => {},
});

export const useLocalStorageContext = () => useContext(LocalStorageContext);

interface LocalStorageProviderProps {
  children: React.ReactNode;
}

export const LocalStorageProvider: React.FC<LocalStorageProviderProps> = ({
  children,
}) => {
  const [templates, setTemplates] = useState<TemplateType[]>([]);

  useEffect(() => {
    const data = getDataFromLocalStorage("templates") || [];
    setTemplates(data);
  }, []);

  const findTemplate = (id: string) => {
    return templates.find((t) => t.id === id) || null;
  };

  const updateTemplate = (htmlContent: string, id: string): void => {
    const targetTemplate = findTemplate(id);

    if (!targetTemplate) return;

    // Create an updated template with the modified HTML content
    const updatedTemplate: TemplateType = {
      ...targetTemplate,
      title: targetTemplate.title,
      editorContent: htmlContent,
    };

    // Update the templates array with the modified template
    const updatedTemplates = templates?.map((template: TemplateType) =>
      template.id === id ? updatedTemplate : template,
    );

    // Save the updated templates to local storage
    if (updatedTemplates) {
      saveDataToLocalStorage("templates", updatedTemplates);
      setTemplates(updatedTemplates);
    }
  };

  const saveTemplate = (title: string, content: string, createAt: string) => {
    const tempTemplate = templates;

    const newTemplate: TemplateType = {
      id: uuidv4(),
      title,
      editorContent: content,
      createAt: createAt,
    };

    tempTemplate.push(newTemplate);
    saveDataToLocalStorage("templates", tempTemplate);
  };

  return (
    <LocalStorageContext.Provider
      value={{
        templates,
        setTemplates,
        findTemplate,
        updateTemplate,
        saveTemplate,
      }}>
      {children}
    </LocalStorageContext.Provider>
  );
};
