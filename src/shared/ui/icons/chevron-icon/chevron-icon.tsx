import React from 'react';
import styled from 'styled-components';

const Positioner = styled.span<{ angle?: number }>`
  display: flex;
  align-items: center;
  transition: 0.2s linear;
  transform: rotateZ(${({ angle }) => angle}deg);
`;

type Props = {
  angle?: number;
  color?: string;
};

export const ChevronIcon = ({ angle, color }: Props) => (
  <Positioner angle={angle}>
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 9l6 6 6-6"
        stroke={color || '#000'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Positioner>
);
