import React from 'react';
import styles from './search_bar.module.css';

const SearchBar = ({ placeholder, handleChange }) => {
  return (
    <input
      type="Search"
      className={styles.search}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
