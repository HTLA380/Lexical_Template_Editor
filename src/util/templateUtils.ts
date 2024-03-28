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
  inputValues: Record<string, string>,
  content: string,
) => {
  return Object.entries(inputValues).reduce((content, [placeholder, value]) => {
    const regex = new RegExp(`{{${placeholder}}}`, "g");
    return content.replace(regex, value);
  }, content);
};
