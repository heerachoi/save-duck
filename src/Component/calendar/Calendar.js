import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  margin-top: 150px;
`;

export const CalendarContainer = styled.div`
  width: 400px;
  margin: 5px;
`;

export const CalendarHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  flex-direction: column;
  margin-bottom: 40px;
`;

export const MonthNavigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const MonthArrow = styled.p`
  font-size: 24px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    color: #ffc226;
  }
`;

export const CurrentYear = styled.p`
  font-size: 14px;
  margin-bottom: 12px;
`;

export const CurrentMonth = styled.p`
  font-size: 33px;
  font-weight: 600;
`;

export const SevenColGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 20px;
`;

export const HeadDay = styled.span`
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  /* color: #ff8a00; */
  margin-bottom: 5px;
`;

export const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(${({ fourCol }) => (fourCol ? 4 : 5)}, 1fr);
`;

export const StyledDay = styled.div`
  height: 40px;
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  padding-top: 6px;
  margin: 3px 1px;
  border-radius: 100px;
  &:hover {
    color: #ffc226;
  }
  /* ${({ active }) => active && `border: 2px solid #FFC226`} */
  ${({ active }) => active && `background-color: rgba(255, 222, 38, 0.6)`}
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 10px;
  background-color: #ffc226;
  margin-top: 10px;
`;

export const ShoppingListContainer = styled.div`
  width: 500px;
  height: 500px;
  margin: 5px;
  font-size: 16px;
`;

export const DateContainer = styled.div`
  text-align: center;
`;

export const DateUnderLine = styled.div`
  border: 0.5px solid #000;
  width: 100%;
  margin: 10px 0px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const ShoppingListTitle = styled.div`
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 15px;
`;

// 안씀
export const ShoppingItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UncheckedList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid;
  margin-bottom: 10px;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 안씀
export const ItemPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  border-bottom: 1px solid;
  width: 400px;
  justify-content: space-between;
`;

export const ShowItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const UnshowItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

// check box 조금 더 찾아보기
export const CheckBox = styled.input`
  border-radius: 40%;
  cursor: pointer;
  margin-right: 10px;
`;

export const ItemName = styled.div`
  width: 300px;
  font-size: 14px;
  padding-bottom: 2px;
`;

export const ItemPrice = styled.div``;

export const PencilIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: 10px;
  font-size: 14px;
`;

export const XIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

export const CheckListTotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  width: 400px;
  font-size: 14px;
  margin-right: 20px;
`;

export const CheckListTotalText = styled.div``;

export const CheckedList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid;
  margin-bottom: 10px;
`;

export const CheckListTotal = styled.div``;

export const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
  align-items: center;
  width: 400px;
  padding-left: 40px;
  font-size: 15px;
  font-weight: 500;
`;

export const TotalPriceText = styled.div``;

export const TotalPrice = styled.div``;

export const ScrollBox = styled.div`
  height: 380px;
  overflow: scroll;
`;
