import { useState } from 'react';
import nextId from 'react-id-generator';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { db } from '../../firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';

import ShoppingList from '../shoppingList/ShoppingList.jsx';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { HomeContainer, CalendarContainer, CalendarHead, SevenColGrid, HeadDay, CalendarBody, MonthNavigation, MonthArrow, StyledDay, CurrentMonth, CurrentYear, Dot } from './Calendar.js';

const Calendar = ({ startingDate }) => {
  const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const MONTHS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  const date = new Date(); // Thu Dec 22 2022 01:04:56 GMT+0900 (한국 표준시)
  const viewYear = date.getFullYear(); // 2022
  const viewMonth = date.getMonth();
  const viewDate = date.getDate();

  const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
  const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());

  const [currentShoppingList, setShoppingList] = useState(<ShoppingList year={viewYear} month={viewMonth} date={viewDate} />);

  const ShoppingListTag = (year, month, date) => {
    // console.log('Different date clicked : ' + year + ' ' + (month + 1) + ' ' + date);
    return setShoppingList(<ShoppingList year={year} month={month} date={date} />);
  };

  const prevLast = new Date(viewYear, viewMonth, 0); // Wed Nov 30 2022 00:00:00 GMT+0900 (한국 표준시)
  const thisLast = new Date(viewYear, viewMonth, 0); // Sat Dec 31 2022 00:00:00 GMT+0900 (한국 표준시)

  const PLDate = prevLast.getDate(); // 30
  const PLDay = prevLast.getDay(); // 3

  const TLDate = thisLast.getDate(); // 31
  const TLDay = thisLast.getDay(); // 6

  const prevDays = [];
  const nextDays = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDays.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDays.push(i);
  }

  // 월별 날짜 수 계산
  const getDaysInMonth = (month, year) => {
    // console.log(new Date(year, month + 1, 0)); // Sat Dec 31 2022 00:00:00 GMT+0900
    // month에 +1을 해주는 이유는 1월이면 0이 온다.
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

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(-1);
      setCurrentMonth((prev) => prev + 1);
      setCurrentYear((prev) => prev + 1);
    }
    changeYearMonth(currentYear, currentMonth);
  };

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(12);
      setCurrentMonth((prev) => prev - 1);
      setCurrentYear((prev) => prev - 1);
    }
    changeYearMonth(currentYear, currentMonth);
  };

  const checkLeapYear = (year) => {
    if (year % 400 === 0) {
      // 육년
      return true;
    } else if (year % 100 === 0) {
      // 평년
      return false;
    } else if (year % 4 === 0) {
      return true;
    } else {
      return false;
    }
  };

  // 1일이 시작할 위치 계산
  const getFirstDayOfWeek = (year, month) => {
    if (month < 10) month = '0' + month;
    return new Date(year + '-' + month + '-1').getDay();
  };

  // 달에 따른 날짜 확인
  const changeYearMonth = (year, month) => {
    let monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      // 윤년 확인
      if (checkLeapYear(year)) monthDay[1] = 29;
    }

    let firstDayOfWeek = getFirstDayOfWeek(year, month);
    let arrCalendar = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      arrCalendar.push('');
    }
    for (let i = 1; i <= monthDay[month - 1]; i++) {
      arrCalendar.push(String(i));
    }
    let remainDay = 7 - (arrCalendar.length % 7);
    if (remainDay < 7) {
      for (let i = 0; i < remainDay; i++) {
        arrCalendar.push('');
      }
    }
    renderCalendar(arrCalendar);
  };
  let h = [];
  const renderCalendar = (data) => {
    h = [];
    for (let i = 0; i < data.length; i++) {
      h.push(data[i]);
    }
  };

  changeYearMonth(currentYear, currentMonth + 1);

  const dateToString = '' + currentYear + currentMonth + viewDate;

  const containShoppingList = (date) => {
    const q = query(collection(db, dateToString), where('isChecked', '==', false));

    getDocs(q).then((querySnapshop) => {
      const firestoreShoppingItemList = [];
      querySnapshop.forEach((doc) => {
        firestoreShoppingItemList.push({
          id: doc.id,
          date: doc.data().date,
          name: doc.data().name,
          isChecked: doc.data().isChecked,
          price: doc.data().price,
          modify: doc.data().modify,
        });
      });
      // console.log('firestoreShoppingItemList');
      // console.log(firestoreShoppingItemList);
      // setItemList(firestoreShoppingItemList);
    });
  };

  return (
    <HomeContainer>
      <CalendarContainer>
        <CalendarHead>
          <CurrentYear>{currentYear}</CurrentYear>
          <MonthNavigation>
            <MonthArrow icon={faChevronLeft} className='goPrevious' onClick={prevMonth}>
              &lt;
            </MonthArrow>
            <CurrentMonth>{MONTHS[currentMonth]}</CurrentMonth>
            <MonthArrow icon={faChevronRight} className='goNext' onClick={nextMonth}>
              &gt;
            </MonthArrow>
          </MonthNavigation>
        </CalendarHead>
        <SevenColGrid>
          {getSortedDays(currentMonth, currentYear).map((day) => (
            <HeadDay key={day}>{day}</HeadDay>
          ))}
        </SevenColGrid>
        <CalendarBody fourCol={DAYSINAMONTH === 28}>
          {h.map((date) => (
            <StyledDay onClick={() => ShoppingListTag(currentYear, currentMonth, date)} key={nextId()} active={areDatesTheSame(new Date(), getDateObj(date, currentMonth, currentYear))}>
              {date}
              <Dot />
            </StyledDay>
          ))}
        </CalendarBody>
      </CalendarContainer>
      {currentShoppingList}
    </HomeContainer>
  );
};

export default Calendar;
