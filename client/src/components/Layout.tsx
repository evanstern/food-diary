import React from 'react';

import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

interface IProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
`;

const Content = styled(Segment)`
  &&& {
    background-color: rgb(255, 255, 255, 0.4);
  }
`;

export const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};
