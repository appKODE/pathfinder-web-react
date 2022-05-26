import { ComponentProps } from 'react';

import { UploadSpec } from '.';

type Props = Partial<ComponentProps<typeof UploadSpec>>;

const args: Props = {};

export default {
  title: 'UI/molecules/UploadSpec',
  component: UploadSpec,
  args,
};

export const Basic = UploadSpec;
