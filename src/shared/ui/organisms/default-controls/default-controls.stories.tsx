import { ComponentProps } from 'react';
import { DefaultControls } from '.';

type Props = Partial<ComponentProps<typeof DefaultControls>>;

const args: Props = {
  defaultEnv: 'dev',
  environments: [
    {
      label: 'Local',
      value: 'local',
    },
    {
      label: 'Dev',
      value: 'dev',
    },
    {
      label: 'Mock',
      value: 'mock',
    },
  ],
};

export default {
  title: 'UI/organisms/DefaultControls',
  component: DefaultControls,
  args,
};

export const Basic = DefaultControls;
