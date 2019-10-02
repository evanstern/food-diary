import React from 'react';

import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100%;
  background: cornflowerblue;
  display: inline-block;
`;

const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Content>
        <h1>Express React Starter</h1>
      </Content>
    </StyledHeader>
  );
};
