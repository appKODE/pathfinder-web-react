import React from 'react';

type Props = {
  color?: string;
};

export const ArrowDownIcon = ({ color }: Props) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8L12 16L20 8"
        stroke={color ?? '#000'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
