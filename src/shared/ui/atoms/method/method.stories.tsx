import { ComponentProps } from 'react';

import { Method } from '.';

type Props = Partial<ComponentProps<typeof Method>>;

const args: Props = {
  method: 'DELETE',
};

export default {
  title: 'UI/atoms/Method',
  component: Method,
  argTypes: {
    method: {
      options: [
        'PUT',
        'GET',
        'HEAD',
        'POST',
        'PATCH',
        'TRACE',
        'DELETE',
        'CONNECT',
        'OPTIONS',
      ],
      control: { type: 'radio' },
    },
  },
  args,
};

export const Basic = Method;
