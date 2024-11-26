import React, { useState, useEffect } from 'react';
import './SearchboxTimeout.css';

const SearchboxTimeout = ({
  value = '',
  setValue,
  placeholder = 'Buscar...',
  readOnly = false,
  delay = 900,
}) => {
  const [searchQuery, setSearchQuery] = useState(value);
  const [timeoutId, setTimeoutId] = useState(null);
  const [containerClass, setContainerClass] = useState('SearchBoxContainer');

  // Sync the local state with the prop value
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  // Handle input changes
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);

    // Clear any existing timeout when input changes
    if (timeoutId) {
      clearTimeout(timeoutId);
      setContainerClass('SearchBoxContainer');
    }
  };

  // Clear the search input
  const handleClearButtonClick = () => {
    setSearchQuery('');
  };

  // Focus on the input when the component mounts
  useEffect(() => {
    document.querySelector('.ImageBarMenuSearchInput').focus();
  }, []);

  // Handle delayed search trigger
  useEffect(() => {
    setContainerClass('SearchBoxContainerAnimated');
    
    // Set up a delayed action for handling the search
    const id = setTimeout(() => {
      setValue(searchQuery);
      setContainerClass('SearchBoxContainer');
    }, delay);

    // Save the timeout ID to clear it if needed
    setTimeoutId(id);

    // Clear timeout on cleanup if the component re-renders
    return () => clearTimeout(id);
  }, [searchQuery, setValue]);

  return (
    <div className="SearchboxTimeout mb-2">
      <div className="InputContainer">
        <input
          readOnly={readOnly}
          type="text"
          className="ImageBarMenuSearchInput SearchBoxInput"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        {searchQuery && (
          <button
            className="ClearButton"
            onClick={handleClearButtonClick}
            aria-label="Clear"
          >
            &#10005;
          </button>
        )}
      </div>
      <div className={containerClass}></div>
    </div>
  );
};

export default SearchboxTimeout;
