import React from 'react';
import styles from '../styles/searchbar.module.css';


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
