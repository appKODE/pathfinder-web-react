import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './pathfinder.module.css';
import { PanelButton } from '../shared/ui/atoms/panel-button/index';
import { Panel } from '../shared/ui/organisms/panel/index';

import {
  createPathFinder,
  DataResolver,
  DataStorage,
  EnvSpec,
  Spec,
  UrlSpec,
} from '@kode-frontend/pathfinder-web-core';

import { addConsoleActivation } from '../features/hidden-activation';
import { useRequestInterception } from '../processes/request-interception';

import { TPanelEnv, TPanelUrl } from '../shared/ui/organisms/panel/types';

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
      <div className={styles.app}>{children}</div>
      <div className={styles.action}>
        <PanelButton onClick={handleToggle} />
      </div>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.overlay} />
          <div className={styles.content}>
            <Panel
              onLoadSpec={handleLoadSpec}
              config={config}
              defaultEnvId={module.getGlobalEnv()}
              onClose={handleToggle}
              onChangeDefaultEnv={handleChangeDefaultEnv}
              onChangeUrlEnv={handleChangeUrlEnv}
              urlEnvInitialValues={initialUrlValues}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};
