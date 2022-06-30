import { ComponentProps } from 'react';

import { Button } from '.';

type Props = Partial<ComponentProps<typeof Button>>;

const args: Props = {
  children: <>Button</>,
  title: 'Button',
  active: false,
};

export default {
  title: 'UI/atoms/Button',
  component: Button,
  args,
  argTypes: {
    variant: {
      options: ['active', 'transparent', 'header', 'headerActive', 'normal'],
      control: { type: 'radio' },
    },
  },
};

export const Basic = Button;
