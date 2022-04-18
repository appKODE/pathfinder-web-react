import { ComponentProps } from 'react';
import { Args, Meta, Story } from '@storybook/react';
import Component from './header';

type Props = ComponentProps<typeof Component>;
type StoryProps<T> = T extends {} ? T : Args;

export default { title: 'UI/molecules/Header', component: Component } as Meta;

export const Header: Story<StoryProps<Props>> = props => (
  <Component {...props} children="Header" />
);
