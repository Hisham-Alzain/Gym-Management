import React from 'react';
import styles from '../styles/SearchBar.module.css'; 

const SearchBar = ({ placeholder, handleChange }) => {
  return (
    <input
      type="search"
      className={styles.search}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default SearchBar;