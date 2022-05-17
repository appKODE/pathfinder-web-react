import React, { useMemo, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { ScrollWrapper, Button } from '../../atoms';
import { Header, UploadSpec, RadioGroup } from '../../molecules';
import { EndpointsList } from '..';
import { TRadioOptions } from '../../atoms/radio-input/types';
import { TConfig } from './types';
import { SearchInput } from '../../flows';
import { TUrlItem } from '../endpoints-list/types';
import { UrlMethod } from '@kode-frontend/pathfinder-web-core';

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
  onResetOptions: () => void;
};

export const Panel = ({
  config,
  defaultEnvId,
  urlEnvInitialValues,
  onClose,
  onChangeDefaultEnv,
  onChangeUrlEnv,
  onLoadSpec,
  onResetOptions,
}: Props) => {
  const [defaultEnv, setDefaultValue] = useState<string>(defaultEnvId || '');
  const [filteredPaths, setFilteredPaths] = useState<TUrlItem[]>(
    config.urlList
  );
  const [searchValue, setSearchValue] = useState<string>('');

  const methods = Array.from(
    new Set(config.urlList.map((item) => item.method))
  );
  const [filteredMethods, setFilteredMethods] = useState<UrlMethod[]>(methods);

  const onHandleChange = (value: string) => {
    setSearchValue(value);
  }

  const environments = useMemo<TRadioOptions[]>(
    () =>
      config.envList.map((env) => ({
        value: env.id,
        label: env.name,
      })),
    [config]
  );

  const resetOptions = useCallback(() => {
    setDefaultValue('');
    onResetOptions();
  }, [onResetOptions]);

  const onClearHandler = () => {
    setFilteredPaths(config.urlList);
    setSearchValue('');
  }

  const onSelectMethod = (selectedMethod: UrlMethod | null) => {
    if (!selectedMethod) {
      return setFilteredMethods(methods);
    }
    setFilteredMethods(methods.filter((method) => method === selectedMethod));
  }

  useEffect(() => {
    setFilteredPaths(
      config.urlList.filter(
        (item) =>
          filteredMethods.includes(item.method) &&
          item.template.includes(searchValue)
      )
    );
  }, [searchValue, filteredMethods]);

  return (
    <Wrapper>
      <Header onClose={onClose}>Pathfinder</Header>
      <UploadSpec onLoad={onLoadSpec} />
      <SearchInput
        value={searchValue}
        methods={methods}
        onClearHandler={onClearHandler}
        onSelectMethod={onSelectMethod}
        onHandleChange={onHandleChange}
      />
      {environments.length > 0 && (
        <ScrollWrapper>
          <DefaultControls>
            <tbody>
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
              <tr>
                <td></td>
                <td align="right">
                  <Button
                    active
                    title="reset to default"
                    onClick={resetOptions}
                  >
                    reset to default
                  </Button>
                </td>
              </tr>
            </tbody>
          </DefaultControls>
        </ScrollWrapper>
      )}
      {config.urlList.length > 0 && (
        <EndpointsList
          onChange={onChangeUrlEnv}
          environments={environments}
          items={filteredPaths}
          initialValues={urlEnvInitialValues}
        />
      )}
    </Wrapper>
  );
};
