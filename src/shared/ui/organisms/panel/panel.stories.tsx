import { ComponentProps } from 'react';
import { Args, Meta, Story } from '@storybook/react';
import { Panel } from './panel';

type Props = ComponentProps<typeof Panel>;
type StoryProps<T> = T extends {} ? T : Args;

const config = {
  envList: [
    { id: 'local', name: 'Local' },
    { id: 'prod', name: 'Prod' },
    { id: 'dev', name: 'Dev' },
  ],
  urlList: Array(1000)
    .fill(undefined)
    .map((_, index) => ({
      id: index.toString(),
      method: 'GET',
      template: '/user/{1}/list',
    })),
};

const storage = {
  defaultEnvId: 'local',
  url: {
    '3': {
      envId: 'dev',
    },
    '7': {
      envId: 'local',
    },
    '8': {
      envId: 'dev',
    },
  },
};

export default {
  title: 'UI/organisms/Panel',
  component: Panel,
  args: { config, data: storage },
} as Meta;
