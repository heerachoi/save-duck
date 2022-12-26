// import { current } from '@reduxjs/toolkit';
import { useState } from 'react';
import nextId from 'react-id-generator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { HomeContainer, CalendarHead, SevenColGrid, HeadDay, CalendarBody, StyledDay } from './Calendar.js';

// Firestore와 통신하는 함수
import { loadListFB } from '../../redux/modules/shoppingListActions.js';

const Calendar = ({ startingDate }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadListFB());
  }, []);

  const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
  const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());

  const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const MONTHS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  /////////////////////////////////////////////////////////// - 추가: 문제 현제날짜에서만 계산한다. next Month가 눌리면 달력의 개수가 변하지 않는다.
  const date = new Date(); // Thu Dec 22 2022 01:04:56 GMT+0900 (한국 표준시)
  const viewYear = date.getFullYear(); // 2022
  const viewMonth = date.getMonth();
  console.log('date = ' + date);
  console.log('viewYear = ' + viewYear);

  const prevLast = new Date(viewYear, viewMonth, 0); // Wed Nov 30 2022 00:00:00 GMT+0900 (한국 표준시)
  const thisLast = new Date(viewYear, viewMonth + 1, 0); // Sat Dec 31 2022 00:00:00 GMT+0900 (한국 표준시)
  console.log('prevLast = ' + prevLast);
  console.log('thisLast = ' + thisLast);

  const PLDate = prevLast.getDate(); // 30
  const PLDay = prevLast.getDay(); // 3
  console.log('PLDate = ' + PLDate);
  console.log('PLDay = ' + PLDay);

  const TLDate = thisLast.getDate(); //
  const TLDay = thisLast.getDay(); //
  console.log('TLDate = ' + TLDate);
  console.log('TLDay = ' + TLDay);

  const prevDays = [];
  const thisDays = [...Array(TLDate + 1).keys()].slice(1);
  console.log('thisDays = ' + thisDays);
  const nextDays = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDays.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDays.push(i);
  }
  console.log('nexDays = ' + nextDays);

  const dates = prevDays.concat(thisDays, nextDays);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);
  console.log(dates);
  //////////////////////////////////////////////////////////////////////////////////////////////

  // 월별 날짜 수 계산
  const getDaysInMonth = (month, year) => {
    console.log(new Date(year, month + 1, 0)); // Sat Dec 31 2022 00:00:00 GMT+0900
    return new Date(year, month + 1, 0).getDate();
  };

  // 월별 날짜 수
  const DAYSINAMONTH = getDaysInMonth(currentMonth, currentYear);

  const getSortedDays = (day, month, year) => {
    const dayIndex = new Date(year, month, 1).getDay();
    return [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)];
  };

  const getDateObj = (day, month, year) => {
    return new Date(year, month, day);
  };

  // 오늘 날짜인 곳에 핑크색 배경
  const areDatesTheSame = (first, second) => {
    return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
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

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(-1);
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(12);
      setCurrentMonth((prev) => prev - 1);
    }
  };

  return (
    <HomeContainer>
      <CalendarHead>
        <FontAwesomeIcon icon={faChevronLeft} className='goPrevious' onClick={prevMonth} />
        <p>
          {MONTHS[currentMonth]} {currentYear}
        </p>
        <FontAwesomeIcon icon={faChevronRight} className='goNext' onClick={nextMonth} />
      </CalendarHead>
      <SevenColGrid>
        {getSortedDays(currentMonth, currentYear).map((day) => (
          <HeadDay key={day}>{day}</HeadDay>
        ))}
      </SevenColGrid>
      <CalendarBody fourCol={DAYSINAMONTH === 28}>
        {dates.map((day) => (
          <StyledDay key={nextId()} active={areDatesTheSame(new Date(), getDateObj(day, currentMonth, currentYear))}>
            {day}
          </StyledDay>
        ))}
      </CalendarBody>
      <button
        onClick={
          // firestore에서 첫번째 문서 삭제
          () => {
            dispatch(loadListFB(0));
          }
        }
      >
        데이터 삭제
      </button>
    </HomeContainer>
  );
};

export default Calendar;
