import { ComponentProps } from 'react';

import { ScrollWrapper } from '.';

type Props = Partial<ComponentProps<typeof ScrollWrapper>>;

const args: Props = {
  children: (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
        laboriosam non est dicta. Possimus quas perspiciatis, eos voluptates
        quisquam corrupti et alias, dolores veritatis magni quos quo iusto
        adipisci culpa!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
        laboriosam non est dicta. Possimus quas perspiciatis, eos voluptates
        quisquam corrupti et alias, dolores veritatis magni quos quo iusto
        adipisci culpa!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
        laboriosam non est dicta. Possimus quas perspiciatis, eos voluptates
        quisquam corrupti et alias, dolores veritatis magni quos quo iusto
        adipisci culpa!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
        laboriosam non est dicta. Possimus quas perspiciatis, eos voluptates
        quisquam corrupti et alias, dolores veritatis magni quos quo iusto
        adipisci culpa!
      </p>
    </div>
  ),
  height: '70px',
};

export default {
  title: 'UI/atoms/ScrollWrapper',
  component: ScrollWrapper,
  args,
};

export const Basic = ScrollWrapper;
