import React from 'react';
import styled from 'styled-components';

import { Button } from '../../atoms';
import { KeyValueField, RadioGroup } from '../../molecules';
import { TRadioOptions } from '../../atoms/radio-input/types';

const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const Text = styled.p`
  display: block;
  min-width: 300px;
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const ButtonWrapper = styled.div`
  align-self: flex-end;
`;

type Props = {
  defaultEnv: string;
  defaultHeaders: string;
  environments: TRadioOptions[];
  onResetOptions: () => void;
  onChangeDefaultEnv: (value: string) => void;
  onChangeDefaultHeaders: (headers: string) => void;
};

export const DefaultControls = ({
  defaultEnv,
  defaultHeaders,
  environments,
  onResetOptions,
  onChangeDefaultHeaders,
  onChangeDefaultEnv,
}: Props) => {
  return (
    <Wrapper>
      <ControlsWrapper>
        <Text>Use the requests environment for all requests:</Text>
        <KeyValueField
          title="Headers"
          placeholder="Enter each header on a new line. &#10;For example:&#10;Authorization: Bearer 123&#10;Prefer: code=200, dynamic=true"
          onApply={onChangeDefaultHeaders}
          initialValue={defaultHeaders}
        />
        <RadioGroup
          id={'default'}
          value={defaultEnv}
          color={'red'}
          onChange={onChangeDefaultEnv}
          items={[
            ...environments,
            {
              label: 'Default',
              value: '',
            },
          ]}
        />
      </ControlsWrapper>

      <ButtonWrapper>
        <Button active title="reset to default" onClick={onResetOptions}>
          reset to default
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};