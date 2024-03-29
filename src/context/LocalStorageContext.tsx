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
  updateTemplate: (updated: TemplateType, id: string) => void;
  createTemplate: (title: string, content: string, createAt: string) => void;
  deleteTemplate: (id: string) => void;
}

const LocalStorageContext = createContext<LocalStorageContextInterface>({
  templates: [],
  setTemplates: () => {},
  findTemplate: () => null,
  updateTemplate: () => {},
  createTemplate: () => {},
  deleteTemplate: () => {},
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

  const createTemplate = (title: string, content: string, createAt: string) => {
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

  const updateTemplate = (updated: TemplateType, id: string) => {
    const updatedTemplate = templates?.map((template) =>
      template.id === id ? { ...template, ...updated } : template,
    );

    if (updatedTemplate) {
      saveDataToLocalStorage("templates", updatedTemplate);
      setTemplates(updatedTemplate);
    }
  };

  const deleteTemplate = (id: string) => {
    const targetTemplate = findTemplate(id);

    if (targetTemplate) {
      const filteredTemplates = templates.filter(
        (template) => template.id !== id,
      );
      saveDataToLocalStorage("templates", filteredTemplates);
      setTemplates(filteredTemplates);
    }
  };

  return (
    <LocalStorageContext.Provider
      value={{
        templates,
        setTemplates,
        findTemplate,
        updateTemplate,
        createTemplate,
        deleteTemplate,
      }}>
      {children}
    </LocalStorageContext.Provider>
  );
};
