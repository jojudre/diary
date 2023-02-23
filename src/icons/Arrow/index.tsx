import React from 'react';

const Arrow = ({ className }: { className?: string }) => (
    <svg
        width="14"
        height="12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M13.351 5.39 8.962 1.001a1.075 1.075 0 1 0-1.52 1.519l2.595 2.59h-8.63a1.075 1.075 0 0 0 0 2.15h8.606l-2.57 2.574a1.074 1.074 0 0 0 1.52 1.518l4.388-4.389a1.066 1.066 0 0 0 .315-.813c0-.285-.113-.558-.315-.76Z"
            fill="currentColor"
        />
    </svg>
);

export default Arrow;
