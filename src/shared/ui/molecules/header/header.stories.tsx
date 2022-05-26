import { ComponentProps } from 'react';

import { Header } from '.';

type Props = Partial<ComponentProps<typeof Header>>;
const args: Props = {
  children: 'Panel Header',
};

export default {
  title: 'UI/molecules/Header',
  component: Header,
  args: args,
};

export const Basic = Header;
