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
  templates: Template[];
  setTemplates: React.Dispatch<React.SetStateAction<Template[] | []>>;
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
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const data = getDataFromLocalStorage("templates") || [];
    setTemplates(data);
  }, []);

  return (
    <LocalStorageContext.Provider value={{ templates, setTemplates }}>
      {children}
    </LocalStorageContext.Provider>
  );
};
