import { ComponentProps } from 'react';

import { Button } from '.';

type Props = Partial<ComponentProps<typeof Button>>;

const args: Props = {
  children: <>Button</>,
  title: 'Button',
  transparent: false,
  active: false,
};

export default {
  title: 'UI/atoms/Button',
  component: Button,
  args,
};

export const Basic = Button;
