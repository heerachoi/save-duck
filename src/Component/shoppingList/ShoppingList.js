import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ShoppingListContainer = styled.div`
  width: 500px;
  height: 500px;
  margin: 5px;
  /* background-color: beige; */
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
  /* background-color: aliceblue; */
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* justify-content: center; */
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid;
  margin-bottom: 10px;
`;

export const ListItem = styled.div`
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
  /* margin-bottom: 10px; */
  /* width: 500px; */
  /* justify-content: space-around; */
  /* background-color: aquamarine; */
`;

// 안씀
export const ItemPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  font-size: 14px;
  border-bottom: 1px solid;
  width: 400px;
  /* background-color: aqua; */
  justify-content: space-between;
`;

export const ShowItem = styled.div`
  /* background-color: beige; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
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
  /* border: 1px solid #ffc226; */
`;

export const ItemName = styled.div`
  /* background-color: violet; */
  width: 300px;
  font-size: 14px;
  /* margin-right: 10px; */
  /* border-bottom: 1px solid; */
  padding-bottom: 2px;
`;

export const ItemPrice = styled.div`
  /* margin-right: 10px; */
  /* width: 50px; */
  /* padding-bottom: 2px; */
`;

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
  /* align-items: center; */
  /* text-align: center; */
  margin-top: 5px;
  width: 400px;
  /* background-color: aqua; */
  font-size: 14px;
  margin-right: 20px;
`;

export const CheckListTotalText = styled.div``;

export const CheckedList = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* justify-content: center; */
  /* align-items: center; */
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid;
  margin-bottom: 10px;
  /* background-color: aqua; */
`;

export const CheckListTotal = styled.div``;

export const OverallTotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
  align-items: center;
  /* text-align: center; */
  /* background-color: aqua; */
  width: 400px;
  padding-left: 40px;
  font-size: 15px;
  font-weight: 500;
`;

export const OverallTotalTotalText = styled.div``;

export const OverallTotal = styled.div``;

export const ScrollBox = styled.div`
  height: 380px;
  overflow: scroll;
  /* background-color: aliceblue; */
`;
