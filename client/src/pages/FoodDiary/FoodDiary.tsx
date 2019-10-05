import React, { useState, useEffect } from 'react';

import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import DayPicker from 'react-day-picker';
import moment, { Moment } from 'moment';
import { useTransition, animated, config, useSprings } from 'react-spring';
import {
  Segment,
  Header,
  Divider,
  Icon,
  Card,
  Button,
} from 'semantic-ui-react';
import styled from 'styled-components';

import { Layout } from 'components/Layout';
import { IFoodItem } from 'interfaces/foodItem';

import 'react-day-picker/lib/style.css';

const Content = styled(Segment)`
  &&& {
    background-color: rgb(255, 255, 255, 0.4);
  }
`;

const DateContainer = styled.div`
  display: block;
  text-align: center;
`;

const CurrentDate = styled(Header)`
  cursor: pointer;

  .date-label {
    margin: 0 1rem;
  }
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const StyledCard = styled(Card)`
  &&& {
    width: 100%;
  }
`;

const fetchFoodItemsQuery = gql`
  query FoodItemsQuery($date: Date!) {
    allFoodItems(
      filter: { date: { eq: $date } }
      orderBy: { field: "calories", direction: DESC }
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
  const [isDateVisible, setIsDateVisible] = useState<boolean>(true);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(
    false
  );

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

  const dayPickerTransitions = useTransition(isDatePickerVisible, null, {
    from: { transform: 'scale(0)' },
    enter: { transform: 'scale(1)' },
    leave: { transform: 'scale(0)' },
    config: config.gentle,
    onDestroyed: () => {
      if (!isDatePickerVisible) {
        setIsDateVisible(true);
      }
    },
  });

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

  const handleDateClick = (): void => {
    setIsDateVisible(false);
    setIsDatePickerVisible(true);
  };

  const handleDatePrev = (): void => {
    setDate(moment(date.subtract(1, 'day')));
  };

  const handleDateNext = (): void => {
    setDate(moment(date.add(1, 'day')));
  };

  const handleSelectDate = (day: Date): void => {
    setDate(moment(day));
    setIsDatePickerVisible(false);
  };

  return (
    <Layout>
      <Content>
        {isDateVisible && (
          <DateContainer>
            <CurrentDate as="h1">
              <Icon onClick={handleDatePrev} name="arrow left" />
              <span onClick={handleDateClick} className="date-label">
                {date.format('ll')}
              </span>
              <Icon onClick={handleDateNext} name="arrow right" />
            </CurrentDate>
          </DateContainer>
        )}
        {dayPickerTransitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <DatePickerWrapper>
                  <DayPicker onDayClick={handleSelectDate} />
                </DatePickerWrapper>
              </animated.div>
            )
        )}
        <Divider horizontal>Food you ate today</Divider>
        {data &&
          itemsSprings.map((props, i) => {
            const item = data.allFoodItems.items[i];
            return (
              <animated.div
                key={item._id}
                style={{ ...props, marginBottom: '1.45rem' }}
              >
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
              </animated.div>
            );
          })}
        <Button primary fluid size="big">
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
      </Content>
    </Layout>
  );
};
