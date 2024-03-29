import clsx from "clsx";
import React from "react";

interface IconButtonInterface {
  isActive?: boolean;
  icon: React.ReactNode;
  onClickEvent: () => any;
}

const IconButton: React.FC<IconButtonInterface> = ({
  isActive,
  icon,
  onClickEvent,
}) => {
  return (
    <button
      className={clsx(
        "rounded-md p-1.5 hover:bg-blue-100",
        isActive && "bg-sky-200",
      )}
      onClick={onClickEvent}>
      {icon}
    </button>
  );
};

export default IconButton;
