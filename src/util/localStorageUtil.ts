// Function to retrieve data from localStorage
export const getDataFromLocalStorage = (key: string): any | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Function to save data to localStorage
export const saveDataToLocalStorage = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Function to clear data from localStorage
export const clearLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
