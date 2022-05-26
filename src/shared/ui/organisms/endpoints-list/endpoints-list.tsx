import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ScrollWrapper } from '../../atoms';
import { RadioGroup } from '../../molecules';
import { TRadioOptions } from '../../atoms/radio-input/types';
import { TUrlItem } from './types';
import { Method } from '../../atoms';

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
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <ScrollWrapper height={'60vh'} maxHeight={'60vh'}>
      <Table>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <Method method={item.method} />
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
        </tbody>
      </Table>
    </ScrollWrapper>
  );
};
