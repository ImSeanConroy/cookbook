import React, { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  defaultValue?: string;
  value?: string | number;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
  defaultValue,
  value,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<DropdownOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (value) {
      const found = options.find((opt) => opt.value === value);
      setSelected(found || null);
    } else if (defaultValue) {
      const found = options.find((opt) => opt.value === defaultValue);
      setSelected(found || null);
    } else {
      setSelected(null);
    }
  }, [value, defaultValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-zinc-800 hover:bg-zinc-600 dark:hover:bg-zinc-700 text-white rounded-lg px-3.5 py-2.5 text-left text-sm cursor-pointer focus:outline-none flex flex-row justify-between items-center"
      >
        <p>{selected ? selected.label : "Select..."}</p>
        <IoChevronDown />
      </button>

      {isOpen && (
        <ul className="absolute top-12 z-10 mt-1 py-1 w-full bg-zinc-800 text-white text-sm cursor-pointer rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-zinc-600 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
