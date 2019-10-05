import React from 'react';

import { Card } from 'semantic-ui-react';
import styled from 'styled-components';

import { IFoodItem } from 'interfaces/foodItem';
import { withRouter, RouteComponentProps } from 'react-router';

const StyledCard = styled(Card)`
  &&& {
    cursor: pointer;
    width: 100%;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.8rem;
  }
`;

interface IProps extends RouteComponentProps {
  item: IFoodItem;
}

const ItemComponent: React.FC<IProps> = ({ history, item }) => {
  const handleCardClick = () => {
    history.push(`/item/${item._id}`);
  };

  return (
    <StyledCard key={item._id} onClick={handleCardClick}>
      <Card.Content header={item.name} />
      <Card.Content extra>
        <CardFooter>
          <div>
            <label>Quantity:</label> {item.quantity}
          </div>
          <div>
            <label>Calories:</label> {item.calories}
          </div>
        </CardFooter>
      </Card.Content>
    </StyledCard>
  );
};

export const Item = withRouter(ItemComponent);
