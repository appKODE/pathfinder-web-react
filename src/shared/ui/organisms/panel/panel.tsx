import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { ScrollWrapper } from '../../atoms';
import { Header, UploadSpec, RadioGroup } from '../../molecules';
import { EndpointsList } from '..';
import { TRadioOptions } from '../../atoms/radio-input/types';
import { TConfig } from './types';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.main.light.normal};
  border-radius: 4px;
  overflow: hidden;
  padding: 6px 12px;
`;

const DefaultControls = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    padding: 8px;
  }
`;

const Text = styled.span`
  display: block;
  min-width: 300px;
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

type Props = {
  config: TConfig;
  defaultEnvId: string;
  urlEnvInitialValues: Record<string, string>;

  onClose: () => void;
  onChangeDefaultEnv: (envId: string | null) => void;
  onChangeUrlEnv: (urlId: string, envId?: string) => void;
  onLoadSpec: (data: unknown) => void;
};

export const Panel = ({
  config,
  defaultEnvId,
  onClose,
  onChangeDefaultEnv,
  onChangeUrlEnv,
  onLoadSpec,
  urlEnvInitialValues,
}: Props) => {
  const [defaultEnv, setDefaultValue] = useState<string>(defaultEnvId || '');

  const environments = useMemo<TRadioOptions[]>(
    () =>
      config.envList.map((env) => ({
        value: env.id,
        label: env.name,
      })),
    [config]
  );

  return (
    <Wrapper>
      <Header onClose={onClose}>Pathfinder</Header>
      <UploadSpec onLoad={onLoadSpec} />
      {environments.length > 0 && (
        <ScrollWrapper>
          <DefaultControls>
            <tr>
              <td>
                <Text>Use the requests environment for all requests:</Text>
              </td>
              <td>
                <RadioGroup
                  id={'default'}
                  value={defaultEnv}
                  color={'red'}
                  onChange={(_, value) => {
                    onChangeDefaultEnv(value || null);
                    setDefaultValue(value);
                  }}
                  items={[
                    ...environments,
                    {
                      label: 'Default',
                      value: '',
                    },
                  ]}
                />
              </td>
            </tr>
          </DefaultControls>
        </ScrollWrapper>
      )}
      {config.urlList.length > 0 && (
        <EndpointsList
          onChange={onChangeUrlEnv}
          environments={environments}
          items={config.urlList}
          initialValues={urlEnvInitialValues}
        />
      )}
    </Wrapper>
  );
};
