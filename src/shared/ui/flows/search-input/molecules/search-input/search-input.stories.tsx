import { ComponentProps } from 'react';

import { SearchInput } from '.';

type Props = ComponentProps<typeof SearchInput>;
type PartialProps = Partial<Props>;

const args: PartialProps = {
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'CONNECT'],
  value: 'some value',
};

export default {
  title: 'ui/flows/search-input/molecules/SearchInput',
  component: SearchInput,
  argTypes: {},
  args,
};

export const Basic = SearchInput;
