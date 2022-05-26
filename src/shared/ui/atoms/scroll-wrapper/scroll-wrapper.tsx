import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ $height?: string; $maxHeight?: string }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  width: 100%;
  height: ${({ $height }) => ($height ? $height : 'unset')};
  max-height: ${({ $maxHeight }) => ($maxHeight ? $maxHeight : '75vh')};
  padding: 8px;
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.decorative.medium.translucent}
    transparent;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.colors.decorative.medium.translucent};
    border-radius: 4px;
  }
`;

type Props = {
  children: ReactNode;
  maxHeight?: string;
  height?: string;
};

export const ScrollWrapper = ({ children, maxHeight, height }: Props) => {
  return (
    <Wrapper $height={height} $maxHeight={maxHeight}>
      {children}
    </Wrapper>
  );
};
