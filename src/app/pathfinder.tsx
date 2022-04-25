import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createPathFinder,
  DataResolver,
  DataStorage,
  EnvSpec,
  Spec,
  UrlSpec,
} from '@kode-frontend/pathfinder-web-core';
import styled from 'styled-components';

import { PanelButton } from '../shared/ui/atoms/panel-button/index';
import { Panel } from '../shared/ui/organisms/panel/index';

import { addConsoleActivation } from '../features/hidden-activation';
import { useRequestInterception } from '../processes/request-interception';

import { TPanelEnv, TPanelUrl } from '../shared/ui/organisms/panel/types';

const ActionWrapper = styled.div`
  position: fixed;
  right: 3px;
  bottom: 3px;
  z-index: 10;
  width: 64px;
  height: 64px;
`;

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 25;
  padding: 16px;

  * {
    box-sizing: border-box;
    font-family: sans-serif;
  }
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

type PathfinderProviderProps = {
  children: JSX.Element;
  storage: DataStorage;
  resolver: DataResolver;
  active?: boolean;
};

const toPanelUrl = (url: UrlSpec): TPanelUrl => ({
  id: url.id,
  method: url.method,
  template: url.template,
  name: url.name,
});
const toPanelEnv = (env: EnvSpec): TPanelEnv => ({
  id: env.id,
  name: env.name,
});

export const Pathfinder = ({
  children,
  resolver,
  storage,
  active,
}: PathfinderProviderProps) => {
  const module = useMemo(() => {
    return createPathFinder(resolver, storage);
  }, [resolver, storage]);
  const [spec, setSpec] = useState<Spec | undefined>(module.getSpec());

  const [isActive, setActive] = useState(active);

  useEffect(() => {
    addConsoleActivation(setActive);
  }, [setActive]);

  useRequestInterception(module, isActive || false);

  const [isOpen, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const handleChangeDefaultEnv = (envId: string | null) => {
    module.setGlobalEnv(envId);
  };

  const handleChangeUrlEnv = (urlId: string, envId?: string) => {
    module.setUrlEnv(urlId, envId);
  };

  const handleLoadSpec = (data: unknown) => {
    module.setSpec(data);
    setSpec(module.getSpec());
  };
  const config = {
    urlList: spec?.urls.map(toPanelUrl) || [],
    envList: spec?.envs.map(toPanelEnv) || [],
  };

  if (!isActive) {
    return <Fragment>{children}</Fragment>;
  }

  const initialUrlValues: Record<string, string> = {};

  config.urlList.forEach((url) => {
    const envId = module.getUrlEnv(url.id);

    initialUrlValues[url.id] = envId || '';
  });

  return (
    <Fragment>
      <div>{children}</div>
      <ActionWrapper>
        <PanelButton onClick={handleToggle} />
      </ActionWrapper>
      {isOpen && (
        <Container>
          <Overlay />
          <Content>
            <Panel
              onLoadSpec={handleLoadSpec}
              config={config}
              defaultEnvId={module.getGlobalEnv()}
              onClose={handleToggle}
              onChangeDefaultEnv={handleChangeDefaultEnv}
              onChangeUrlEnv={handleChangeUrlEnv}
              urlEnvInitialValues={initialUrlValues}
            />
          </Content>
        </Container>
      )}
    </Fragment>
  );
};
