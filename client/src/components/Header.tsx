import React from 'react';

import { Header as SemanticHeader, Menu, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import auth from 'utils/auth0';
import { RouteComponentProps, withRouter } from 'react-router';

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

interface IProps extends RouteComponentProps {}

export const HeaderComponent: React.FC<IProps> = ({ history }) => {
  const handleLogOut = () => {
    auth.logout();
    history.replace('/');
  };

  return (
    <StyledHeader>
      <Content borderless>
        <Menu.Item>
          <SemanticHeader as="h1">Food Diary</SemanticHeader>
        </Menu.Item>
        <Menu.Menu position="right">
          {auth.isAuthenticated() ? (
            <Menu.Item>
              <Button primary onClick={handleLogOut}>
                Log out
              </Button>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <Button primary onClick={() => auth.login()}>
                Log in
              </Button>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Content>
    </StyledHeader>
  );
};

export const Header = withRouter(HeaderComponent);
