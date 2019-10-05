import React, { useState, useEffect } from 'react';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Header, Divider, Form, Button } from 'semantic-ui-react';
import moment from 'moment';

import { Layout } from 'components/Layout';
import { IFoodItem } from 'interfaces/foodItem';

interface IMatchProps {
  date: string;
}

interface IProps extends RouteComponentProps<IMatchProps> {}

interface IAddFoodItem {
  addFoodItem: IFoodItem;
}

const addFoodItemMutation = gql`
  mutation AddFoodItem(
    $name: String!
    $quantity: Int!
    $calories: Int!
    $date: Date!
  ) {
    addFoodItem(
      foodItem: {
        name: $name
        quantity: $quantity
        calories: $calories
        date: $date
      }
    ) {
      _id
      name
      quantity
      calories
      date
    }
  }
`;

export const AddItem: React.FC<IProps> = ({ history, match }) => {
  const { date } = match.params;

  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [calories, setCalories] = useState<string>('');

  const [addFoodItem, { data }] = useMutation<IAddFoodItem>(
    addFoodItemMutation
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!name || !quantity || !calories) {
      return;
    }

    addFoodItem({
      variables: {
        name,
        quantity: Number(quantity),
        calories: Number(calories),
        date,
      },
    });
  };

  useEffect(() => {
    if (!data || !data.addFoodItem) {
      return;
    }

    history.push('/food-diary');
  }, [data, history]);

  return (
    <Layout>
      <Header as="h1" textAlign="center">
        {moment(date).format('ll')}
      </Header>
      <Divider horizontal>Add Food</Divider>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field
          name="name"
          type="text"
          label="Name"
          control="input"
          placeholder="Apple"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
        />
        <Form.Field
          name="quantity"
          type="number"
          label="Quantity"
          control="input"
          placeholder="1"
          min="1"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setQuantity(e.currentTarget.value)
          }
        />
        <Form.Field
          name="calories"
          type="number"
          label="Calories"
          control="input"
          placeholder="50"
          min="0"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setCalories(e.currentTarget.value)
          }
        />
        <Button primary fluid size="big" type="submit">
          Done
        </Button>
        <br />
        <Button as={Link} basic fluid size="big" to="/food-diary">
          Cancel
        </Button>
      </Form>
    </Layout>
  );
};
