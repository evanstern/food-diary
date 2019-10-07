import React, { useState, useEffect } from 'react';

import moment from 'moment';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import { Card, Image, Button, Form, Modal, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import { Layout } from 'components/Layout';
import { Loader } from 'components/Loader';
import { IFoodItem } from 'interfaces/foodItem';

import foodIcon from './food.jpg';

interface IMatchProps {
  id: string;
}

interface IProps extends RouteComponentProps<IMatchProps> {}

interface IResults {
  foodItem: IFoodItem;
}

const StyledCard = styled(Card)`
  &&& {
    width: 100%;

    form {
      margin-bottom: 1.0875rem;
    }
  }
`;

const getFoodItemQuery = gql`
  query FoodItem($id: ID!) {
    foodItem(id: $id) {
      name
      quantity
      calories
      date
      createdAt
      updatedAt
    }
  }
`;

interface IDeleteResults {
  deleteFoodItem: IFoodItem;
}

const deleteFoodItemMutation = gql`
  mutation DeleteFoodItem($id: ID!) {
    deleteFoodItem(id: $id) {
      _id
      date
    }
  }
`;

const ItemComponent: React.FC<IProps> = ({ history, match }) => {
  const { id } = match.params;

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { loading, data } = useQuery<IResults>(getFoodItemQuery, {
    variables: { id },
  });
  const [
    deleteFoodItem,
    { loading: deletedLoding, data: deletedFoodItem },
  ] = useMutation<IDeleteResults>(deleteFoodItemMutation);

  useEffect(() => {
    if (!deletedFoodItem) {
      return;
    }
    const { date } = deletedFoodItem.deleteFoodItem;
    history.push(`/food-diary/${moment(date).format('YYYY-MM-DD')}`);
  }, [history, deletedFoodItem]);

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsDeleting(true);
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!data) {
      return;
    }

    history.push(
      `/food-diary/${moment(data.foodItem.date).format('YYYY-MM-DD')}`
    );
  };

  const handleCloseModal = () => {
    setIsDeleting(false);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(false);
    deleteFoodItem({ variables: { id } });
  };

  const {
    name = '',
    quantity = '',
    calories = '',
    date = null,
    createdAt = null,
    updatedAt = null,
  } = data ? data.foodItem : {};

  return (
    <>
      {(loading || deletedLoding) && <Loader />}
      <Modal basic open={isDeleting} onClose={handleCloseModal} size="small">
        <Header icon="trash" content={`Delete "${name}"?`} />
        <Modal.Content>Deleting can't be undone.</Modal.Content>
        <Modal.Actions>
          <Button inverted color="green" onClick={handleDeleteConfirm}>
            Delete
          </Button>
          <Button inverted secondary onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      <Layout>
        <StyledCard>
          <Card.Content>
            <Image floated="right" size="mini" src={foodIcon} />
            <Card.Header>{name}</Card.Header>
            <Card.Meta>{date ? moment(date).format('ll') : ''}</Card.Meta>
            <Card.Description>
              <Form>
                <Form.Field
                  label="Name"
                  type="text"
                  control="input"
                  value={name}
                  disabled
                />
                <Form.Field
                  label="Quantity"
                  type="number"
                  control="input"
                  value={quantity}
                  disabled
                />
                <Form.Field
                  label="Calories"
                  type="number"
                  control="input"
                  value={calories}
                  disabled
                />
                <Form.Field
                  label="Created At"
                  type="text"
                  control="input"
                  value={createdAt ? moment(createdAt).format('lll') : ''}
                  disabled
                />
                <Form.Field
                  label="Updated At"
                  type="text"
                  control="input"
                  value={updatedAt ? moment(updatedAt).format('lll') : ''}
                  disabled
                />
              </Form>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic secondary size="big" onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button basic color="red" size="big" onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          </Card.Content>
        </StyledCard>
      </Layout>
    </>
  );
};

export const Item = withRouter(ItemComponent);
