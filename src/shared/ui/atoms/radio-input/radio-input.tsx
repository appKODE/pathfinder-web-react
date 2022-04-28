import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

import { TRadioOptions } from './types';

const VisibleRadio = styled.span`
  position: relative;
  display: block;
  width: 14px;
  min-width: 14px;
  height: 14px;
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.colors.decorative.medium.normal};
  transition: 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    top: 3px;
    left: 3px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.digital.blue.translucent};
    pointer-events: none;
    transition: 0.3s ease;
    transform: scale(0);
    opacity: 0.7;
  }
`;

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    ${VisibleRadio}::after {
      transform: scale(3.4);
    }
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);

  &:focus + ${VisibleRadio} {
    outline: 1px solid ${({ theme }) => theme.colors.digital.blue.translucent};
  }

  &:checked + ${VisibleRadio} {
    border-color: ${({ theme }) => theme.colors.digital.blue.normal};

    &::after {
      background-color: ${({ theme }) => theme.colors.digital.blue.normal};
      transform: scale(1);
      opacity: 1;
    }
  }
`;

type Props = TRadioOptions & {
  id: string;
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const RadioInput = ({
  id,
  label,
  value,
  isChecked,
  onChange,
}: Props) => {
  const inputId = `${id}-${label}`;

  return (
    <Wrapper htmlFor={inputId}>
      <HiddenInput
        id={inputId}
        type="radio"
        name={id}
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      <VisibleRadio />
      {label}
    </Wrapper>
  );
};
