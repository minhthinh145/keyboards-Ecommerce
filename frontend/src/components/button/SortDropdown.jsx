import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

const SortDropdown = ({ onChange }) => {
  const options = [
    "Phổ biến nhất",
    "Giá tăng dần",
    "Giá giảm dần",
    "Mới nhất"
  ];

  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    onChange(option);
    setOpen(false);
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className="relative inline-block text-sm group">
      <div className="flex items-center space-x-2 px-1 py-1 rounded">
        {/* Selected text with hover underline and toggle on click */}
        <span
          className="text-gray-700 px-1 rounded relative cursor-pointer"
          onClick={toggleDropdown} 
        >
          {selected}
          {/* Line under text on hover */}
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </span>

        {/* Arrow icon */}
        <button
          onClick={toggleDropdown}
          className={`bg-gray-200 p-1 rounded-full hover:bg-black hover:text-white transition-all ${
            open ? "rotate-180" : ""
          }`}
        >
          <MdExpandMore
            size={20}
            className={`rounded-full bg-gray-200 text-black transition-all group-hover:bg-black group-hover:text-white ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown options */}
      {open && (
        <ul className="absolute mt-2 w-44 bg-white border rounded shadow z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
