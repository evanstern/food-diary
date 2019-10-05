import React, { useState } from 'react';

import moment, { Moment } from 'moment';
import DayPicker from 'react-day-picker';
import { useTransition, animated, config } from 'react-spring';
import { Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

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

interface IProps {
  date: Moment;
  onDayChange: (date: Moment) => void;
}

export const DatePicker: React.FC<IProps> = ({ date, onDayChange }) => {
  const [isDateVisible, setIsDateVisible] = useState<boolean>(true);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(
    false
  );

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

  const handleDatePrev = () => {
    onDayChange(moment(date.subtract(1, 'day')));
  };

  const handleDateNext = () => {
    onDayChange(moment(date.add(1, 'day')));
  };

  const handleDateClick = () => {
    setIsDateVisible(false);
    setIsDatePickerVisible(true);
  };

  const handleSelectDate = (day: Date): void => {
    onDayChange(moment(day));
    setIsDatePickerVisible(false);
  };

  return (
    <>
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
    </>
  );
};
