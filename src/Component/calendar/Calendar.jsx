import { useState } from 'react';
import nextId from 'react-id-generator';
import { faChevronLeft, faChevronRight, faPencil, faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  HomeContainer,
  CalendarContainer,
  ShoppingListContainer,
  CalendarHead,
  SevenColGrid,
  HeadDay,
  CalendarBody,
  MonthNavigation,
  MonthArrow,
  StyledDay,
  DateContainer,
  DateUnderLine,
  ShoppingListTitle,
  ShoppingItemContainer,
  UncheckedList,
  ListItem,
  CheckBox,
  ItemName,
  ItemPrice,
  CheckedList,
  CurrentMonth,
  CurrentYear,
  PencilIcon,
  XIcon,
  ItemPriceContainer,
  CheckListTotalContainer,
  CheckListTotalText,
  CheckListTotal,
  OverallTotalContainer,
  OverallTotalTotalText,
  OverallTotal,
  ShowItem,
  UnshowItem,
  ScrollBox,
} from './Calendar.js';

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

  const date = new Date(); // Thu Dec 22 2022 01:04:56 GMT+0900 (한국 표준시)
  const viewYear = date.getFullYear(); // 2022
  const viewMonth = date.getMonth();

  const prevLast = new Date(viewYear, viewMonth, 0); // Wed Nov 30 2022 00:00:00 GMT+0900 (한국 표준시)
  const thisLast = new Date(viewYear, viewMonth, 0); // Sat Dec 31 2022 00:00:00 GMT+0900 (한국 표준시)

  const PLDate = prevLast.getDate(); // 30
  const PLDay = prevLast.getDay(); // 3
  // console.log('PLDate = ' + PLDate);
  // console.log('PLDay = ' + PLDay);

  const TLDate = thisLast.getDate(); // 31
  const TLDay = thisLast.getDay(); // 6
  // console.log('TLDate = ' + TLDate);
  // console.log('TLDay = ' + TLDay);

  const prevDays = [];
  const thisDays = [...Array(TLDate + 1).keys()].slice(1);
  // console.log('thisDays = ' + thisDays);
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

  const dateClick = () => {
    console.log(currentMonth);
  };

  changeYearMonth(currentYear, currentMonth + 1);
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
          {h.map((day) => (
            <StyledDay onClick={dateClick} key={nextId()} active={areDatesTheSame(new Date(), getDateObj(day, currentMonth, currentYear))}>
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
      </CalendarContainer>
      <ShoppingListContainer>
        <DateContainer>22.12.19</DateContainer>
        <DateUnderLine></DateUnderLine>
        <ShoppingListTitle>쇼핑 목록 +</ShoppingListTitle>
        <ScrollBox>
          <UncheckedList>
            <ListItem>
              <ShowItem>
                <CheckBox type='checkbox' />
                <ItemPriceContainer>
                  <ItemName>고구마</ItemName>
                  <ItemPrice>5,500원</ItemPrice>
                </ItemPriceContainer>
              </ShowItem>
              <UnshowItem>
                <PencilIcon icon={faPencil} />
                <XIcon icon={faX} />
              </UnshowItem>
            </ListItem>
            <ListItem>
              <CheckBox type='checkbox' />
              <ItemPriceContainer>
                <ItemName>입력해주세요</ItemName>
                <ItemPrice>-- 원</ItemPrice>
              </ItemPriceContainer>
              <PencilIcon icon={faPencil} />
              <XIcon icon={faX} />
            </ListItem>
            <CheckListTotalContainer>
              <CheckListTotalText>합계</CheckListTotalText>
              <CheckListTotal>244,600원</CheckListTotal>
            </CheckListTotalContainer>
          </UncheckedList>
          <ShoppingListTitle>쇼핑 완료</ShoppingListTitle>
          <CheckedList>
            <ListItem>
              <ShowItem>
                <CheckBox type='checkbox' />
                <ItemPriceContainer>
                  <ItemName>당근</ItemName>
                  <ItemPrice>3,500원</ItemPrice>
                </ItemPriceContainer>
              </ShowItem>
              <UnshowItem>
                <PencilIcon icon={faPencil} />
                <XIcon icon={faX} />
              </UnshowItem>
            </ListItem>
            <CheckListTotalContainer>
              <CheckListTotalText>합계</CheckListTotalText>
              <CheckListTotal>244,600원</CheckListTotal>
            </CheckListTotalContainer>
          </CheckedList>
        </ScrollBox>
        <OverallTotalContainer>
          <OverallTotalTotalText>총 합계</OverallTotalTotalText>
          <OverallTotal>244,600원</OverallTotal>
        </OverallTotalContainer>
      </ShoppingListContainer>
    </HomeContainer>
  );
};

export default Calendar;
