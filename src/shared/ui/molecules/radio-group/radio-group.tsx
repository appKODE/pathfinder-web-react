import React from 'react';
import styled from 'styled-components';

import { RadioInput } from '../../atoms';
import { TRadioOptions } from '../../atoms/radio-input/types';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 26px;
`;

type TRadiogroupProps = {
  id: string;
  items: TRadioOptions[];
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
      <RadioInput
        key={item.value}
        id={id}
        value={item.value}
        label={item.label}
        isChecked={item.value === value}
        onChange={() => onChange(id, item.value)}
      />
    ))}
  </Wrapper>
);
