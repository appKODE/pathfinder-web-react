import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { UrlMethod } from '@kode-frontend/pathfinder-web-core';

import { ScrollWrapper } from '../../atoms';
import { RadioGroup } from '../../molecules';
import { TRadioOptions } from '../../atoms/radio-input/types';
import { TUrlItem } from './types';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr {
    transition: 0.2s linear;

    &:hover {
      background: ${({ theme }) => theme.colors.decorative.light.normal};
    }
  }

  tr td {
    padding: 8px;
    border: 1px solid
      ${({ theme }) => theme.colors.decorative.medium.translucent};
  }
`;

const Method = styled.span<{ $background: string }>`
  font-size: 12px;
  display: inline-block;
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.main.light.normal};
  border-radius: 4px;
  background-color: ${({ $background }) => $background};
`;

const EndpointName = styled.span`
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.decorative.medium.normal};
`;

type Props = {
  environments: TRadioOptions[];
  items: TUrlItem[];
  initialValues: Record<string, string>;
  onChange: (urlId: string, envId?: string) => void;
};

export const EndpointsList = ({
  environments,
  items,
  initialValues,
  onChange,
}: Props) => {
  const theme = useTheme();
  const [values, setValues] = useState(initialValues);

  const methodColor: Record<UrlMethod, string> = {
    GET: theme.colors.digital.green.normal,
    POST: theme.colors.digital.blue.normal,
    DELETE: theme.colors.digital.red.normal,
    PUT: theme.colors.digital.orange.normal,
    PATCH: theme.colors.digital.orange.normal,
    HEAD: theme.colors.digital.violet.normal,
    TRACE: theme.colors.digital.violet.normal,
    CONNECT: theme.colors.digital.violet.normal,
    OPTIONS: theme.colors.digital.violet.normal,
  };

  return (
    <ScrollWrapper>
      <Table>
        {items.map((item) => (
          <tr key={item.id}>
            <td>
              <Method $background={methodColor[item.method]}>
                {item.method}
              </Method>
            </td>
            <td>
              {item.template}
              <EndpointName>{item.name}</EndpointName>
            </td>
            <td>
              <RadioGroup
                id={item.id}
                value={values[item.id]}
                onChange={(id, value) => {
                  onChange(id, value || undefined);
                  setValues((prev) => ({ ...prev, [id]: value }));
                }}
                items={[
                  ...environments,
                  {
                    label: 'Global',
                    value: '',
                  },
                ]}
              />
            </td>
          </tr>
        ))}
      </Table>
    </ScrollWrapper>
  );
};
