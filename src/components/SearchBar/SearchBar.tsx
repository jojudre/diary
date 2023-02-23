import Search from 'icons/Search';
import React, { FC, ChangeEvent } from 'react';
import cn from 'classnames';
import css from './SearchBar.module.scss';

type SearchBarProps = {
    searchValue: string;
    onSearchChange: (val: string) => void;
    placeholder?: string;
    className?: string;
};

const SearchBar: FC<SearchBarProps> = ({
    searchValue,
    onSearchChange,
    placeholder = '',
    className,
}) => {
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    return (
        <div className={cn(css.wrap, className)}>
            <span className={css.icon}>
                <Search />
            </span>
            <input
                value={searchValue}
                onChange={handleSearchChange}
                type="text"
                placeholder={placeholder}
                className={css.input}
            />
        </div>
    );
};

export default SearchBar;
