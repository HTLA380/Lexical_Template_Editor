import { TemplateType } from "@/types/templateTypes";
import { saveDataToLocalStorage } from "./localStorageUtil";
import { v4 as uuidv4 } from "uuid";

export const findTemplate = (templates: TemplateType[], id: string) => {
  return templates.find((t) => t.id === id) || null;
};

export const saveTemplate = (
  templates: TemplateType[],
  title: string,
  content: string,
  createAt: string,
) => {
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

export const findPlaceholders = (content: string) => {
  const regex = /{{(.*?)}}/g;
  let matches;
  const placeholders = [];
  while ((matches = regex.exec(content)) !== null) {
    placeholders.push(matches[1]);
  }
  return placeholders;
};

export const replaceVariables = (
  content: string,
  inputValues: Record<string, string>,
) => {
  const placeholders = findPlaceholders(content);
  return placeholders.reduce((acc, placeholder) => {
    const regex = new RegExp(`{{${placeholder}}}`);
    const value = inputValues[placeholder] || "";
    return acc.replace(regex, value);
  }, content);
};
