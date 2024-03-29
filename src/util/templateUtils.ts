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
