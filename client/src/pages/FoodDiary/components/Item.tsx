import React from 'react';

import { Card } from 'semantic-ui-react';
import styled from 'styled-components';

import { IFoodItem } from 'interfaces/foodItem';

const StyledCard = styled(Card)`
  &&& {
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

interface IProps {
  item: IFoodItem;
}

export const Item: React.FC<IProps> = ({ item }) => {
  return (
    <StyledCard key={item._id}>
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
