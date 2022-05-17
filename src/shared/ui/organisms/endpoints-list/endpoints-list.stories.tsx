import { ComponentProps } from 'react';
import { Args, Meta, Story } from '@storybook/react';
import { EndpointsList } from './endpoints-list';

type Props = ComponentProps<typeof EndpointsList>;
type PartialProps = Partial<Props>;
type StoryProps<T> = T extends {} ? T : Args;

const args: PartialProps = {
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
};

export default {
  title: 'Pathfinder/organisms/EndpointList',
  component: EndpointsList,
  args,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as Meta;

export const Panel: Story<StoryProps<Props>> = (props) => (
  <EndpointsList {...props} />
);
