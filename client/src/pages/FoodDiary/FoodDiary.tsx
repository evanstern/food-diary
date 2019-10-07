import React, { useEffect } from 'react';

import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Link, RouteComponentProps } from 'react-router-dom';
import { animated, useSprings } from 'react-spring';
import { Segment, Header, Divider, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import 'react-day-picker/lib/style.css';

import { Layout } from 'components/Layout';
import { Loader } from 'components/Loader';
import { IFoodItem } from 'interfaces/foodItem';

import { DatePicker } from './components/DatePicker';
import { Item } from './components/Item';

const NotFound = styled.div`
  margin: 2rem 0;
`;

const fetchFoodItemsQuery = gql`
  query FoodItemsQuery($date: Date!) {
    allFoodItems(
      filter: { date: { eq: $date } }
      orderBy: { field: "createdAt", direction: ASC }
    ) {
      totalCalories
      totalQuantity
      items {
        _id
        name
        quantity
        calories
      }
    }
  }
`;

interface IFoodItemsData {
  allFoodItems: {
    totalCalories: number;
    totalQuantity: number;
    items: IFoodItem[];
  };
}

interface IMatchProps {
  date: string;
}

interface IProps extends RouteComponentProps<IMatchProps> {}

export const FoodDiary: React.FC<IProps> = ({ match }) => {
  const { date } = match.params;

  const [fetchAllFoodItems, { loading, data }] = useLazyQuery<IFoodItemsData>(
    fetchFoodItemsQuery,
    {
      fetchPolicy: 'network-only',
    }
  );

  useEffect(() => {
    const dt = moment(date);
    fetchAllFoodItems({
      variables: { date: dt.startOf('day').format('YYYY-MM-DD') },
    });
  }, [date, fetchAllFoodItems]);

  const itemsSprings = useSprings(
    data ? data.allFoodItems.items.length : 0,
    data
      ? data.allFoodItems.items.map(() => ({
          marginLeft: 0,
          opacity: 1,
          transform: 'translate3d(0, 0px, 0)',
          from: {
            opacity: 0,
            transform: 'translate3d(-40px, 0, 0)',
          },
        }))
      : []
  );

  return (
    <Layout>
      <DatePicker />
      {!loading ? (
        <>
          <Divider horizontal>Food you ate today</Divider>
          {(!data || data.allFoodItems.items.length === 0) && (
            <NotFound>
              <Header as="h3" textAlign="center">
                Nothing eaten on this day.
              </Header>
              <Header as="h3" textAlign="center">
                Add some food!
              </Header>
            </NotFound>
          )}
          {data &&
            itemsSprings.map((props, i) => {
              const item = data.allFoodItems.items[i];
              return (
                <animated.div
                  key={item._id}
                  style={{ ...props, marginBottom: '1.45rem' }}
                >
                  <Item item={item} />
                </animated.div>
              );
            })}
          <Button
            as={Link}
            primary
            fluid
            size="big"
            to={`/food-diary/add/${date}`}
          >
            Add Food
          </Button>
          {data && (
            <>
              <Divider horizontal>Summary</Divider>
              <Segment>
                <Header as="h4">
                  Items Eaten: {data.allFoodItems.totalQuantity}
                </Header>
                <Header as="h4">
                  Total Calories: {data.allFoodItems.totalCalories}
                </Header>
              </Segment>
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};
