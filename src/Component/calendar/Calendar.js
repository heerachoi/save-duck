import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  /* border: 1px solid; */
  height: 590px;
  width: 700px;
`;

export const SevenColGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  ${(props) => props.fullheight && `height: calc(100% - 75px);`}
  ${(props) => props.fullheight && `grid-template-rows: repeat(${props.is28Days ? 4 : 5}, 1fr);`}
  div {
    /* display: grid;
    border: 1px solid;

    span {
      text-align: right;
      padding-right: 15px;
      height: fit-content;
    }

    span.active {
      background-color: pink;
      border-bottom: 2px solid red;
      position: relative;
    }
    span.active::before {
      content: 'Today ';
      font-size: 14px;
    } */
  }
`;

export const HeadDays = styled.span`
  text-align: center;
  /* border: 1px solid; */
  height: 30px;
  padding: 5px;
  color: balck;
`;

export const DateControls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  align-items: center;
`;

export const StyledDay = styled.span`
  /* border: 1px solid; */
  text-align: center;
  padding: 5px;
  ${({ active }) => active && `background: pink`};
`;
