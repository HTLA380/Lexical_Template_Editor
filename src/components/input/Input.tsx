import React from "react";

interface InputProps {
  label?: string;
  inputValue: string;
  onChange: () => any;
}

const Input: React.FC<InputProps> = ({ label, inputValue, onChange }) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={label.toLocaleLowerCase()}
          className="mb-2 block text-sm font-medium"
        >
          {label}
        </label>
      )}

      <input
        type="text"
        id={label?.toLocaleLowerCase()}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder="John"
        value={inputValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
