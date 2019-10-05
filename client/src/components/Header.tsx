import React from 'react';

import { Button, Header as SemanticHeader, Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { useAuth0 } from 'utils/auth0';

const StyledHeader = styled.header`
  width: 100%;
  background-color: transparent;
  display: inline-block;
`;

const Content = styled(Menu)`
  box-shadow: none !important;
  background-color: transparent !important;
  border: none !important;
  max-width: 960px;
  margin: 0 auto !important;
`;

export const Header: React.FC = () => {
  const { loading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <StyledHeader>
      <Content borderless>
        <Menu.Item>
          <SemanticHeader as="h1">Food Diary</SemanticHeader>
        </Menu.Item>
        <Menu.Menu position="right">
          {!loading && !isAuthenticated && (
            <Menu.Item>
              <Button primary basic onClick={() => loginWithRedirect({})}>
                login
              </Button>
            </Menu.Item>
          )}
          {!loading && isAuthenticated && (
            <Menu.Item>
              <Button primary basic onClick={() => logout()}>
                logout
              </Button>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Content>
    </StyledHeader>
  );
};
