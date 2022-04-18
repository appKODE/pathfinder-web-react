import { ComponentProps } from 'react';
import { Args, Meta, Story } from '@storybook/react';
import Component from './close-icon';

type Props = ComponentProps<typeof Component>;
type StoryProps<T> = T extends {} ? T : Args;

export default { title: 'UI/atoms/Close Icon', component: Component } as Meta;

export const CloseIcon: Story<StoryProps<Props>> = props => (
  <Component {...props} width={32} height={32} />
);
