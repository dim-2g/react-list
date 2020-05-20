import React from 'react';
import i18next from 'i18next';

export const SearchBar = (props) => {
    const search = e => {
        const searchText = e.target.value.toLowerCase().trim();
        props.onChange(searchText);
    }
    return (
    <div className="searchbar">
        <input
            type="text"
            onChange={(e) => search(e)}
            placeholder={i18next.t('search_placeholder')}
            value={props.term}
        />
    </div>
)};

export default SearchBar;
