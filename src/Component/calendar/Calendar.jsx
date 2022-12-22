import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { CalendarWrapper, SevenColGrid, HeadDays, DateControls, StyledDay } from './Calendar.js';

const Calendar = ({ startingDate }) => {
  const MONTHS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
  const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const DAYSINMONTH = getDaysInMonth(currentMonth, currentYear);

  const getDateObj = (day, month, year) => {
    return new Date(year, month, day);
  };

  const range = (end) => {
    const { result } = Array.from({ length: end }).reduce(
      ({ result, current }) => ({
        result: [...result, current],
        current: current + 1,
      }),
      { result: [], current: 1 }
    );
    return result;
  };

  const sortDays = (date) => {
    const dayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const sortedDays = [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)];
    console.log(sortedDays);
    return sortedDays;
  };

  const datesAreOnSameDay = (first, second) => first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();

  const getYear = (date) => {
    const d = date.toLocaleDateString().split('.');
    console.log('d ' + d);
    return `${d[0]}`;
  };

  const getMonth = (date) => {
    const d = date.toLocaleDateString().split('.');
    console.log('d ' + d);
    return `${d[1]}`;
  };

  const nextMonth = (date, cb) => {
    const mon = date.getMonth();
    if (mon < 11) {
      date.setMonth(mon + 1);
    } else {
      date.setMonth(0);
      date.setFullYear(date.getFullYear() + 1);
    }
    cb(new Date(date));
  };

  const prevMonth = (date, cb) => {
    const mon = date.getMonth();
    if (mon > 0) {
      date.setMonth(mon - 1);
    } else {
      date.setMonth(11);
      date.setFullYear(date.getFullYear() - 1);
    }
    cb(new Date(date));
  };

  return (
    <CalendarWrapper>
      <DateControls>
        <FontAwesomeIcon icon={faChevronLeft} onClick={() => prevMonth(currentDate, setCurrentDate)} name='arrow-back-circle-outline' />
        {getYear(currentDate)}
        {getMonth(currentDate)}
        <FontAwesomeIcon icon={faChevronRight} onClick={() => nextMonth(currentDate, setCurrentDate)} name='arrow-forward-circle-outline' />
      </DateControls>
      <SevenColGrid>
        {DAYS.map((day) => (
          <HeadDays key={day}>{day}</HeadDays>
        ))}
      </SevenColGrid>

      <SevenColGrid fullheight={true} is28Days={getDaysInMonth(currentDate) === 28}>
        {range(DAYSINMONTH).map((day) => (
          <StyledDay key={day} id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`} active={datesAreOnSameDay(new Date(), getDateObj(day, currentMonth, currentYear))}>
            {day}
          </StyledDay>
        ))}
      </SevenColGrid>
    </CalendarWrapper>
  );
};
export default Calendar;
