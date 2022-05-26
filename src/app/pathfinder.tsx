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
import styled, { ThemeProvider } from 'styled-components';

import { theme } from '../ui/theme';
import { PanelButton } from '../shared/ui/atoms';
import { Panel } from '../shared/ui/organisms';
import { TPanelEnv, TPanelUrl } from '../shared/ui/organisms/panel/types';

import { addConsoleActivation } from '../features';
import { useRequestInterception } from '../processes';

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
  max-width: 85vw;
  transform: translate(-50%, -50%);
  z-index: 25;
  padding: 16px;
  color: ${({ theme }) => theme.colors.main.dark.normal};

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
  background-color: ${({ theme }) => theme.colors.decorative.dark.translucent};
  backdrop-filter: blur(3px);
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
  const [isOpen, setOpen] = useState(false);
  const [isActive, setActive] = useState(active);

  useEffect(() => {
    addConsoleActivation(setActive);
  }, [setActive]);

  useRequestInterception(module, isActive || false);

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

  const handleOnResetOptions = () => {
    module.reset();
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
    <ThemeProvider theme={theme}>
      <div>{children}</div>
      <ActionWrapper>
        <PanelButton onClick={handleToggle} />
      </ActionWrapper>
      {isOpen && (
        <Container>
          <Overlay />
          <Content>
            <Panel
              config={config}
              defaultEnvId={module.getGlobalEnv()}
              urlEnvInitialValues={initialUrlValues}
              onLoadSpec={handleLoadSpec}
              onClose={handleToggle}
              onChangeDefaultEnv={handleChangeDefaultEnv}
              onChangeUrlEnv={handleChangeUrlEnv}
              onResetOptions={handleOnResetOptions}
            />
          </Content>
        </Container>
      )}
    </ThemeProvider>
  );
};
