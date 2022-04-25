import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { Header } from '../../molecules/header';
import { EndpointsList } from '../../organisms/endpoints-list';
import { UploadSpec } from '../../molecules/upload-spec/upload-spec';
import { RadioGroup } from '../../molecules/radio-group';
import { TOption } from '../../molecules/radio-group/types';
import { TConfig } from './types';

const Wrapper = styled.div`
  background-color: #fff;
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

  const environments = useMemo<TOption[]>(
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
        <DefaultControls>
          <tr>
            <td>Use the requests environment for all requests:</td>
            <td>
              <RadioGroup
                id={'default'}
                value={defaultEnv}
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

export default Panel;
