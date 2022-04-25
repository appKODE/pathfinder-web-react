import React, { memo, MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';

import { Button, CloseIcon } from '../../atoms';

const Wrapper = styled.div`
  display: flex;
  padding: 18px 8px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  flex: 1 1 auto;
  margin: 0;
`;

const ActionWrapper = styled.div`
  flex: 0 0 auto;
  align-self: flex-start;
  margin-top: -3px;
  margin-right: -6px;
`;

type Props = {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
};

export const Header = memo(({ children, onClose }: Props) => (
  <Wrapper>
    <Title>{children}</Title>
    <ActionWrapper>
      <Button onClick={onClose} transparent>
        <CloseIcon width={16} height={16} />
      </Button>
    </ActionWrapper>
  </Wrapper>
));

export default Header;
