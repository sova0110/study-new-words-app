import React from 'react';
import styles from './searchInput.module.css'

function SearchInput({ searchTerm, onSearchChange }) {
    return (
        <input
            type="text"
            placeholder="Поиск по английскому написанию или переводу"
            value={searchTerm}
            onChange={onSearchChange}
            className={styles.searchInput}
        />
    );
}

export default SearchInput;