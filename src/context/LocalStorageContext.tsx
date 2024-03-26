"use client";

import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "@/util/localStorageUtil";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Template {
  id: string;
  title: string;
  editorContent: string;
  createAt: string;
}

interface LocalStorageContextInterface {
  templates: Template[] | null;
  setTemplates: React.Dispatch<React.SetStateAction<Template[] | null>>;
}

const LocalStorageContext = createContext<LocalStorageContextInterface>({
  templates: [],
  setTemplates: () => {},
});

export const useLocalStorageContext = () => useContext(LocalStorageContext);

interface LocalStorageProviderProps {
  children: React.ReactNode;
}

export const LocalStorageProvider: React.FC<LocalStorageProviderProps> = ({
  children,
}) => {
  const [templates, setTemplates] = useState<Template[] | null>(null);

  useEffect(() => {
    const data = getDataFromLocalStorage("templates") || null;
    setTemplates(data);
  }, []);

  return (
    <LocalStorageContext.Provider value={{ templates, setTemplates }}>
      {children}
    </LocalStorageContext.Provider>
  );
};
