import { ComponentProps } from 'react';

import { RadioGroup } from '.';

type Props = Partial<ComponentProps<typeof RadioGroup>>;

const mockData = [
  {
    label: 'Radio Input 1',
    value: '1',
  },
  {
    label: 'Radio Input 2',
    value: '2',
  },
  {
    label: 'Radio Input 3',
    value: '3',
  },
  {
    label: 'Radio Input 4',
    value: '4',
  },
  {
    label: 'Radio Input 5',
    value: '5',
  },
];

const args: Props = {
  id: 'id',
  items: mockData,
  value: '2',
};

export default {
  title: 'UI/molecules/RadioGroup',
  component: RadioGroup,
  argTypes: {
    color: {
      options: ['green', 'yellow', 'orange', 'violet', 'blue', 'red'],
      control: { type: 'radio' },
    },
  },
  args,
};

export const Basic = RadioGroup;
