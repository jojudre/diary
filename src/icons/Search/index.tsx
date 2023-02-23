import React from 'react';

const Search = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="17"
    viewBox="0 0 19 17"
    fillRule="evenodd"
    className={className}
  >
    <circle cx="6.5" cy="6.5" r="5.5" />
    <path d="M14 14l3.536 3.536" />
  </svg>
);

export default Search;
