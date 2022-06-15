import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { UrlMethod } from '@kode-frontend/pathfinder-web-core';
import styled from 'styled-components';

import { Header, UploadSpec } from '../../molecules';
import { SearchInput } from '../../flows';
import { EndpointsList, DefaultControls } from '..';
import { TRadioOptions } from '../../atoms/radio-input/types';
import { TConfig } from './types';
import {
  THeadersChangeHandler,
  TUrlHeaders,
  TUrlItem,
} from '../endpoints-list/types';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.main.light.normal};
  border-radius: 4px;
  overflow: hidden;
  padding: 6px 12px;
`;

type Props = {
  config: TConfig;
  defaultEnvId: string | null;
  urlEnvInitialValues: Record<string, string>;
  defaultHeaders: string;
  urlHeaders: TUrlHeaders;
  onClose: () => void;
  onChangeDefaultEnv: (envId: string | null) => void;
  onChangeUrlEnv: (urlId: string, envId?: string) => void;
  onLoadSpec: (data: unknown) => void;
  onChangeDefaultHeaders: (headers: string) => void;
  onChangeEndpointHeaders: THeadersChangeHandler;
  onResetOptions: () => void;
};

export const Panel = ({
  config,
  defaultEnvId,
  urlEnvInitialValues,
  defaultHeaders,
  urlHeaders,
  onClose,
  onChangeDefaultEnv,
  onChangeUrlEnv,
  onLoadSpec,
  onChangeDefaultHeaders,
  onChangeEndpointHeaders,
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
  };

  const onChangeDefaultEnvHandler = (value: string) => {
    onChangeDefaultEnv(value || null);
    setDefaultValue(value);
  };

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
  };

  const onSelectMethod = (selectedMethod: UrlMethod | null) => {
    if (!selectedMethod) {
      return setFilteredMethods(methods);
    }
    setFilteredMethods(methods.filter((method) => method === selectedMethod));
  };

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
        <DefaultControls
          defaultEnv={defaultEnv}
          defaultHeaders={defaultHeaders}
          environments={environments}
          onResetOptions={resetOptions}
          onChangeDefaultHeaders={onChangeDefaultHeaders}
          onChangeDefaultEnv={onChangeDefaultEnvHandler}
        />
      )}

      {config.urlList.length > 0 && (
        <EndpointsList
          headers={urlHeaders}
          environments={environments}
          items={filteredPaths}
          initialValues={urlEnvInitialValues}
          onBasePathChange={onChangeUrlEnv}
          onHeadersChange={onChangeEndpointHeaders}
        />
      )}
    </Wrapper>
  );
};
