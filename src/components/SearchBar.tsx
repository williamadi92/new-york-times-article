import React from "react";

interface SearchBarProps {
  inputValue: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, onChange }) => {
  return (
    <div className="sticky top-0 py-4 w-full bg-white z-10 px-8">
      <p className="text-xl font-semibold text-center">
        New York Times Article
      </p>
      <input
        type="text"
        placeholder="Search articles..."
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 p-2 border border-gray-500 rounded-lg mt-4"
      />
    </div>
  );
};

export default SearchBar;
