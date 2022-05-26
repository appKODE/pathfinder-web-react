import { ComponentProps } from 'react';

import { PanelButton } from '.';

type Props = Partial<ComponentProps<typeof PanelButton>>;

const args: Props = {};

export default {
  title: 'UI/atoms/PanelButton',
  component: PanelButton,
  args,
};

export const Basic = PanelButton;
