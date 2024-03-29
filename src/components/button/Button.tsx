import clsx from "clsx";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  variant,
}) => {
  let buttonColor;

  switch (variant) {
    case "primary":
      buttonColor = "bg-gray-800 text-white";
      break;
    case "outline":
      buttonColor =
        "bg-transparent text-black border border-gray-800 hover:bg-gray-200";
      break;
    case "secondary":
      buttonColor = "bg-gray-200 text-black";
      break;
    case "danger":
      buttonColor = "bg-red-600 hover:bg-red-700 text-white";
      break;
    default:
      buttonColor = "bg-gray-800 text-white hover:bg-gray-700";
  }

  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-fit rounded-md px-4 py-2 text-sm",
        buttonColor,
        className,
      )}>
      {children}
    </button>
  );
};

export default Button;
