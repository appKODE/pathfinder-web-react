import React, { memo, MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';

type TButtonVariant = 'active' | 'transparent' | 'normal';

type TButtonColors = {
  background: string;
  border: string;
  text: string;
};

const ButtonWrapper = styled.button<{
  $text: string;
  $background: string;
  $border: string;
  $active?: boolean;
}>`
  appearance: none;
  margin: 0;
  padding: 3px 6px;
  display: flex;
  align-content: center;
  justify-content: center;
  border: 1px solid ${({ $border }) => $border};
  background-color: ${({ $background }) => $background};
  color: ${({ $text }) => $text};
  transition: 0.2s linear;
  cursor: pointer;

  &:hover {
    background-color: rgba(144, 202, 249, 0.6);
  }

  ${({ $active, $background }) =>
    $active &&
    css`
      &:hover {
        background-color: ${$background};
      }
    `}
`;

const colors: Record<TButtonVariant, TButtonColors> = {
  active: {
    background: '#282c34',
    border: '#333',
    text: '#fff',
  },
  transparent: {
    background: 'transparent',
    border: 'transparent',
    text: 'rgba(51, 51, 51, 0.85)',
  },
  normal: {
    background: '#90caf9',
    border: '#333',
    text: 'rgba(51, 51, 51, 0.85)',
  },
};

type Props = {
  children: ReactNode;
  transparent?: boolean;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = memo(
  ({ children, transparent, active, onClick }: Props) => {
    const variant: TButtonVariant = active
      ? 'active'
      : transparent
      ? 'transparent'
      : 'normal';

    return (
      <ButtonWrapper
        $text={colors[variant].text}
        $background={colors[variant].background}
        $border={colors[variant].border}
        $active={active}
        onClick={onClick}
      >
        {children}
      </ButtonWrapper>
    );
  }
);

export default Button;
