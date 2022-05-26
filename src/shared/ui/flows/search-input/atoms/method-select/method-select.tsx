import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { UrlMethod } from '@kode-frontend/pathfinder-web-core';

import { ChevronIcon } from '../../../../icons';
import { Method } from '../../../../atoms';

const Wrapper = styled.div`
  position: relative;
  width: 150px;
`;

const MethodButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.main.dark.normal};
  padding: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Text = styled.span`
  font-family: sans-serif;
  font-size: 16px;
  line-height: 20px;
  padding: 0;
  margin: 0;
  white-space: nowrap;
`;

const DropDown = styled.div`
  position: absolute;
  top: 38px;
  left: -10px;
  width: 170px;
  min-height: 50px;
  background-color: ${({ theme }) => theme.colors.decorative.light.normal};
  border-radius: 0 0 3px 3px;
`;

const DropDownItem = styled.div`
  height: 40px;
  padding: 0 10px;
  width: 100%;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

type Props = {
  methods?: UrlMethod[];
  onSelectMethod: (method: UrlMethod | null) => void;
};

export const MethodSelect = ({ methods, onSelectMethod }: Props) => {
  const [selectedMethod, setSelectedMethod] = useState<UrlMethod | null>(null);
  const [isDropped, setIsDropped] = useState<boolean>(false);

  const theme = useTheme();

  const onHandleSelect = (method: UrlMethod | null) => {
    onSelectMethod(method);
    setSelectedMethod(method);
    setIsDropped(false);
  };

  return (
    <Wrapper>
      <MethodButton
        type="button"
        onClick={() => {
          setIsDropped((prevState) => !prevState);
        }}
      >
        <Text>{selectedMethod ?? 'All methods'}</Text>
        <ChevronIcon
          color={theme.colors.main.dark.normal}
          angle={isDropped ? 180 : 0}
        />
      </MethodButton>

      {isDropped && (
        <DropDown>
          <DropDownItem
            onClick={() => {
              onSelectMethod(null);
              setSelectedMethod(null);
              setIsDropped(false);
            }}
          >
            All methods
          </DropDownItem>

          {methods &&
            [...methods].map((method, index) => (
              <DropDownItem onClick={() => onHandleSelect(method)} key={index}>
                <Method method={method} />
              </DropDownItem>
            ))}
        </DropDown>
      )}
    </Wrapper>
  );
};
