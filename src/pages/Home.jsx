// // import { useSelector } from 'react-redux';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import Calendar from '../Component/calendar/Calendar';

// import style from './style.css';
// import { HomeContainer, CalendarHead, SevenColGrid, HeadDay, CalendarBody, StyledDay } from './style';

// const Home = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

//   const MONTHS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

//   const range = (end) => {
//     const { result } = Array.from({ length: end }).reduce(
//       ({ result, current }) => ({
//         result: [...result, current],
//         current: current + 1,
//       }),
//       { result: [], current: 1 }
//     );
//     return result;
//   };

//   return (
//     <HomeContainer>
//       <CalendarHead>
//         <button className='goPrevious'>&lt;</button>
//         <p>12월</p>
//         <button className='goNext'>&gt;</button>
//       </CalendarHead>
//       <SevenColGrid>
//         {DAYS.map((day) => (
//           <HeadDay key={day}>{day}</HeadDay>
//         ))}
//       </SevenColGrid>
//       <CalendarBody>
//         {range(31).map((day) => (
//           <StyledDay key={day}>{day}</StyledDay>
//         ))}
//       </CalendarBody>
//       <div className='shoppingList'></div>
//     </HomeContainer>
//   );
// };

// export default Home;

import Calender from '../Component/calendar/Calendar.jsx';

const Home = () => {
  return <Calender startingDate={new Date()}></Calender>;
};

export default Home;
