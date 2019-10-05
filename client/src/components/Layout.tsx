import React from 'react';

import styled from 'styled-components';

interface IProps {
  children: React.ReactNode;
}

const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
`;

export const Layout: React.FC<IProps> = ({ children }) => {
  return <Content>{children}</Content>;
};
