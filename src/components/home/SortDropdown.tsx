import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

type Options = {
  [index: string]: string;
};

function SortDropdown({
  setSortValue,
}: {
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("desc");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const options: Options[] = [
    { value: "desc", label: "Date (newest first)" },
    { value: "asc", label: "Date (oldest first)" },
  ];

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  function toggleDropdown(): void {
    setIsOpen((prev) => !prev);
  }

  function handleSelect(value: string): void {
    setSelected(value);
    setSortValue(value);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="px-4 py-2 border border-gray-300 dark:border-dark-green dark:bg-dark-gray rounded-md bg-white hover:bg-gray-100 text-sm font-medium flex items-center justify-between w-48"
      >
        {selectedLabel}
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-gray dark:border-dark-green border border-gray-200 rounded-md shadow-lg z-20"
          tabIndex={-1}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={selected === option.value}
              onClick={() => handleSelect(option.value)}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-500 ${
                selected === option.value ? "brightness-100 font-medium" : ""
              }`}
            >
              <span>{option.label}</span>
              {selected === option.value && (
                <Check className="w-4 h-4 text-green-600" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
