import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface CustomDropdownProps<T extends string | number> {
  label: string;
  value: T;
  options: T[];
  onChange: Dispatch<SetStateAction<T>>;
}

const CustomDropdown = <T extends string | number>({
  label,
  value,
  options,
  onChange,
}: CustomDropdownProps<T>) => {
  const [openOptions, setOpenOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative border rounded-lg px-2 py-1">
      <p
        className="cursor-pointer min-w-40"
        onClick={() => setOpenOptions(!openOptions)}
      >
        {value || label}
      </p>
      {openOptions && (
        <div className="absolute left-0 right-0 bg-white shadow-lg rounded-b-lg max-h-60 overflow-y-auto z-10 mt-0.5">
          <div className="max-h-60 overflow-y-auto rounded-b-lg">
            {options.map((option, index) => (
              <p
                key={index}
                className="cursor-pointer px-2 py-1 hover:hover:bg-light"
                onClick={() => {
                  onChange(option);
                  setOpenOptions(false);
                }}
              >
                {option}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
