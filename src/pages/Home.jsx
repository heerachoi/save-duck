import { useSelector } from 'react-redux';
import style from './style.css';

const Home = () => {
  const list = useSelector((state) => state.todoApp);

  const date = new Date();

  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);

  dates.forEach((date, i) => {
    dates[i] = `<div class='date'>${date}</div>`;
  });

  // document.querySelector('.dates').innerHTML = dates.join('');

  return (
    <div className='homeContainer'>
      <div className='calendar'>
        <div className='calendarHeader'>
          <div className='yearMonth'>
            {viewYear}년 {viewMonth + 1}월
          </div>
          <div className='calendarNavigation'>
            <button className='goPrevious'>&lt;</button>
            <button className='goToday'>Today</button>
            <button className='goNext'>&gt;</button>
          </div>
        </div>
        <div className='main'>
          <div className='days'>
            <div className='day'>일</div>
            <div className='day'>월</div>
            <div className='day'>화</div>
            <div className='day'>수</div>
            <div className='day'>목</div>
            <div className='day'>금</div>
            <div className='day'>토</div>
          </div>
          <div className='dates'>{date}</div>
        </div>
      </div>
      <div className='shoppingList'></div>
    </div>
  );
};

export default Home;
