import React from 'react';
import styled from 'styled-components';

import { TOption } from './types';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
`;

const Label = styled.label`
  position: relative;
  padding: 4px;
  padding-left: 32px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  position: absolute;
  left: 0;
  margin: 2px 8px;
`;

type TRadiogroupProps = {
  items: TOption[];
  id: string;
  onChange: (id: string, value: string) => void;
  value?: string;
};

export const RadioGroup = ({
  id,
  items,
  value,
  onChange,
}: TRadiogroupProps) => (
  <Wrapper>
    {items.map((item) => (
      <Label key={item.value}>
        <RadioInput
          type="radio"
          name={id}
          value={item.value}
          checked={item.value === value}
          onChange={() => onChange(id, item.value)}
        />
        {item.label}
      </Label>
    ))}
  </Wrapper>
);

export default RadioGroup;
