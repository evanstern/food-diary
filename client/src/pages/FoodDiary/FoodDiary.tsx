import React, { useState, useEffect } from 'react';

import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import moment, { Moment } from 'moment';
import { Link } from 'react-router-dom';
import { animated, useSprings } from 'react-spring';
import { Segment, Header, Divider, Button } from 'semantic-ui-react';
import 'react-day-picker/lib/style.css';

import { Layout } from 'components/Layout';
import { IFoodItem } from 'interfaces/foodItem';

import { DatePicker } from './components/DatePicker';
import { Item } from './components/Item';

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

export const FoodDiary: React.FC = () => {
  const [date, setDate] = useState<Moment>(moment());

  const [fetchAllFoodItems, { data }] = useLazyQuery<IFoodItemsData>(
    fetchFoodItemsQuery,
    {
      fetchPolicy: 'network-only',
    }
  );

  useEffect(() => {
    fetchAllFoodItems({
      variables: { date: date.startOf('day').format('YYYY-MM-DD') },
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

  const handleDayChange = (date: Moment): void => {
    setDate(date);
  };

  return (
    <Layout>
      <DatePicker date={date} onDayChange={handleDayChange} />
      <Divider horizontal>Food you ate today</Divider>
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
        to={`/food-diary/add/${date.format('YYYY-MM-DD')}`}
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
    </Layout>
  );
};
