import React, { useState } from 'react';
import styled from 'styled-components';
import { UrlMethod } from '@kode-frontend/pathfinder-web-core';

import { RadioGroup } from '../../molecules';
import { TOption } from '../../molecules/radio-group/types';
import { TUrlItem } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  width: 100%;
  max-height: 80vh;
  padding: 3px 6px;
  box-sizing: border-box;
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr {
    transition: 0.2s linear;

    &:hover {
      background: #eee;
    }
  }

  tr td {
    padding: 8px;
    border: 1px solid #ddd;
  }
`;

const Method = styled.span<{ $background: string }>`
  font-size: 12px;
  display: inline-block;
  padding: 4px 8px;
  color: #fff;
  border-radius: 4px;
  background-color: ${({ $background }) => $background};
`;

const EndpointName = styled.span`
  display: block;
  font-size: 14px;
  color: #666;
`;

type Props = {
  environments: TOption[];
  items: TUrlItem[];
  initialValues: Record<string, string>;
  onChange: (urlId: string, envId?: string) => void;
};

const methodColor: Record<UrlMethod, string> = {
  GET: 'green',
  POST: 'blue',
  DELETE: 'red',
  PATCH: 'orange',
  PUT: 'orange',
  HEAD: '',
  TRACE: '',
  CONNECT: '',
  OPTIONS: '',
};

export const EndpointsList = ({
  environments,
  items,
  initialValues,
  onChange,
}: Props) => {
  const [values, setValues] = useState(initialValues);

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default EndpointsList;
