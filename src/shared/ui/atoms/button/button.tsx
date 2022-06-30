import React, { memo, MouseEventHandler, ReactNode } from 'react';
import styled, { css, useTheme } from 'styled-components';

import { TButtonColors, TButtonVariant } from './types';

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
  outline: none;
  border: ${({ $border }) => $border};
  border-radius: 4px;
  background-color: ${({ $background }) => $background};
  color: ${({ $text }) => $text};
  transition: 0.3s ease;
  cursor: pointer;

  ${({ $active, $background }) =>
    $active &&
    css`
      &:hover {
        background-color: ${$background};
      }
    `}

  &:focus:not(:active) {
    outline: 1px solid ${({ theme }) => theme.colors.digital.blue.normal};
  }

  &:active {
    transform: scale(0.96);
  }

  svg path {
    transition: 0.2s linear;
  }

  &:hover {
    svg path {
      opacity: 0.8;
    }
  }
`;

type Props = {
  children: ReactNode;
  title?: string;
  variant?: TButtonVariant;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = memo(
  ({ children, title, variant, active, onClick }: Props) => {
    const theme = useTheme();
    const buttonVariant = variant ?? 'normal';

    const colors: Record<typeof buttonVariant, TButtonColors> = {
      active: {
        background: theme.colors.main.secondary.normal,
        border: `1px solid ${theme.colors.main.dark.normal}`,
        text: theme.colors.main.light.normal,
      },
      transparent: {
        background: 'transparent',
        border: '1px solid transparent',
        text: theme.colors.main.dark.translucent,
      },
      header: {
        background: 'transparent',
        border: `1px dashed ${theme.colors.main.dark.translucent}`,
        text: theme.colors.main.dark.translucent,
      },
      headerActive: {
        background: theme.colors.main.primary.translucent,
        border: `1px solid ${theme.colors.main.dark.normal}`,
        text: theme.colors.main.dark.normal,
      },
      normal: {
        background: theme.colors.main.primary.normal,
        border: `1px solid ${theme.colors.main.dark.normal}`,
        text: theme.colors.main.dark.translucent,
      },
    };

    return (
      <ButtonWrapper
        $text={colors[buttonVariant].text}
        $background={colors[buttonVariant].background}
        $border={colors[buttonVariant].border}
        $active={active}
        onClick={onClick}
        title={title}
      >
        {children}
      </ButtonWrapper>
    );
  }
);
