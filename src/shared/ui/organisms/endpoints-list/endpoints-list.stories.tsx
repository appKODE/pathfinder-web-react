import { ComponentProps } from 'react';

import { EndpointsList } from '.';

type Props = Partial<ComponentProps<typeof EndpointsList>>;

const args: Props = {
  environments: [
    {
      label: 'label',
      value: '1',
    },
  ],
  initialValues: {
    '1': '',
  },
  items: [
    {
      id: '1',
      method: 'POST',
      name: 'Endpoint name',
      template: '/user',
    },
    {
      id: '2',
      method: 'POST',
      name: 'Endpoint name',
      template: '/user',
    },
  ],
  headers: {
    'get-user-profile': '',
    'delete-user-profile': '',
    'post-auth-login': '',
  },
};

export default {
  title: 'UI/organisms/EndpointList',
  component: EndpointsList,
  args,
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Basic = EndpointsList;
