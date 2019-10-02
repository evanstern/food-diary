import React, { useEffect, useRef } from 'react';

import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

import { Layout } from '../components/Layout';

const Form = styled.form`
  label {
    display: block;
    font-weight: 800;
    text-transform: uppercase;
  }

  input {
    font-size: 1em;
    border-radius: 8px;
    border: 1px solid lightgray;
    line-height: 1em;
    padding: 0.5em;
  }

  button {
    padding: 1em;
    background: cornflowerblue;
    font-weight: 800;
    font-size: 1em;
    border-radius: 8px;
  }

  div {
    margin-bottom: 1.45rem;
  }
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  border: 1px solid lightgray;
  padding: 1.45rem 1.0875rem;
  margin-bottom: 1.45rem;
  width: 100%;
  background-color: #f9f8f8;
`;

const allItemsQuery = gql`
  query AllItems {
    allItems {
      _id
      name
      description
      isCompleted
    }
  }
`;

const addItemMutation = gql`
  mutation AddItem($name: String!, $description: String!) {
    addItem(item: { name: $name, description: $description }) {
      _id
      name
      description
      isCompleted
    }
  }
`;

interface IAllItems {
  allItems: {
    _id: string;
    name: string;
    description: string;
    isCompleted: boolean;
  }[];
}

export const Home: React.FC = () => {
  const [fetchAllItems, { loading, data }] = useLazyQuery<IAllItems>(
    allItemsQuery,
    {
      fetchPolicy: 'network-only',
    }
  );
  const [addItem, { data: newItem }] = useMutation(addItemMutation);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAllItems();
  }, [newItem, fetchAllItems]);

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!nameRef.current || !descriptionRef.current) {
      return;
    }

    const { value: name } = nameRef.current;
    const { value: description } = descriptionRef.current;

    if (!name || !description) {
      return;
    }

    await addItem({
      variables: { name, description },
    });
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Layout>
      <h1>Home Page</h1>

      {data && data.allItems.length === 0 && <h2>No items yet.</h2>}

      <ItemList>
        {data &&
          data.allItems.map(item => <Item key={item._id}>{item.name}</Item>)}
      </ItemList>

      <Form onSubmit={handleFormSubmit}>
        <h3>Add an item</h3>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" ref={nameRef} type="text" name="name" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            ref={descriptionRef}
            type="text"
            name="description"
          />
        </div>
        <button type="submit">Add Item</button>
      </Form>
    </Layout>
  );
};
