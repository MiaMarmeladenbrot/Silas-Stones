import { Dispatch, FC, SetStateAction, useState } from "react";

interface CustomDropdownProps<T> {
  label: string;
  value: T;
  options: T[];
  onChange: Dispatch<SetStateAction<string>>;
}

const CustomDropdown: FC<CustomDropdownProps<string>> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const [openOptions, setOpenOptions] = useState(false);
  console.log(openOptions);

  return (
    <div className="relative border rounded-lg px-2 py-1">
      <p
        className="cursor-pointer min-w-40"
        onClick={() => setOpenOptions(!openOptions)}
      >
        {value || label}
      </p>
      {openOptions && (
        <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-10">
          {options.map((option, index) => (
            <p
              key={index}
              className="cursor-pointer px-2 py-1 hover:bg-gray-200"
              onClick={() => {
                onChange(option);
                setOpenOptions(false);
              }}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
