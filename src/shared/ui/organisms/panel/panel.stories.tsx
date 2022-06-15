import { ComponentProps } from 'react';

import { Panel } from '.';

type Props = Partial<ComponentProps<typeof Panel>>;

const args: Props = {
  config: {
    envList: [
      { id: '0', name: 'Local' },
      { id: '1', name: 'Prod' },
      { id: '2', name: 'Dev' },
    ],
    urlList: Array(30)
      .fill(undefined)
      .map((_, index) => ({
        id: index.toString(),
        method: `${index % 2 === 0 ? 'GET' : 'POST'}`,
        template: `/user/${index}/list`,
        name: 'Endpoint Name',
      })),
  },
  defaultEnvId: '2',
  urlEnvInitialValues: {
    'get-user-profile': '',
    'delete-user-profile': '',
    'post-auth-login': '',
  },
  urlHeaders: {
    'get-user-profile': '',
    'delete-user-profile': '',
    'post-auth-login': '',
  },
  defaultHeaders: '',
};

export default {
  title: 'UI/organisms/Panel',
  component: Panel,
  args,
};

export const Basic = Panel;
