import React, { useRef, useEffect, useState } from "react";

interface DropdownProps {
  trigger: React.ReactNode;
  menuContent: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, menuContent }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDropdown) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, showDropdown]);

  return (
    <div ref={wrapperRef}>
      <div onClick={() => setShowDropdown((prev) => !prev)}>{trigger}</div>
      {showDropdown && <div>{menuContent}</div>}
    </div>
  );
};

export default Dropdown;
