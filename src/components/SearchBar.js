import { useState, useEffect } from 'react';

function SearchBar({ onSearch, searchTerm }) {
  const [input, setInput] = useState(searchTerm);

  // Sync input state with searchTerm prop
  useEffect(() => {
    setInput(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      value={input}
      onChange={handleSearch}
      placeholder={searchTerm || 'Search for a country...'}
      className="p-2 border rounded-md w-full sm:w-1/2"
    />
  );
}

export default SearchBar;