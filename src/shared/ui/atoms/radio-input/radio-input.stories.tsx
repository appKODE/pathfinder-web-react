import { ComponentProps } from 'react';

import { RadioInput } from '.';

type Props = Partial<ComponentProps<typeof RadioInput>>;

const args: Props = {
  label: 'Radio Input',
  isChecked: true,
  color: 'blue',
};

export default {
  title: 'UI/atoms/RadioInput',
  component: RadioInput,
  argTypes: {
    color: {
      options: ['green', 'yellow', 'orange', 'violet', 'blue', 'red'],
      control: { type: 'radio' },
    },
  },
  args,
};

export const Basic = RadioInput;
