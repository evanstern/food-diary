import React from 'react';

import { Loader as SemanticLoader } from 'semantic-ui-react';
import styled from 'styled-components';

const OuterWrapper = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

export const Loader: React.FC = () => {
  return (
    <OuterWrapper>
      <SemanticLoader active size="massive">
        Loading...
      </SemanticLoader>
    </OuterWrapper>
  );
};
