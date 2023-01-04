import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ShoppingListContainer = styled.div`
  width: 550px;
  height: 500px;
  margin: 5px;
  font-size: 16px;
`;

export const DateContainer = styled.div`
  text-align: right;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-right: 20px;
`;

export const DateUnderLine = styled.div`
  border: 0.5px solid #000;
  width: 100%;
  margin: 10px 0px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const ShoppingListTitle = styled.div`
  font-weight: 500;
  font-size: 26px;
  margin-bottom: 30px;
  letter-spacing: 1px;
  text-align: center;
`;

export const UncheckedList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
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

export const ItemPriceInputContainer = styled.div`
  font-size: 16px;
`;

// check box 조금 더 찾아보기
export const CheckBox = styled.input`
  border-radius: 40%;
  cursor: pointer;
  margin-right: 10px;
`;

export const XIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  cursor: pointer;
  &:hover {
    color: #ff8a00;
  }
`;

export const CheckIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: 10px;
  font-size: 15px;
  &:hover {
    color: #ff8a00;
  }
`;

export const ItemInput = styled.input`
  width: 310px;
  height: 20px;
  padding: 5px 3px;
  border: none;
  /* margin-bottom: 10px; */
`;

export const ItemPriceInput = styled.input`
  width: 50px;
  height: 20px;
  padding: 5px 3px;
  border: none;
  margin-right: 6px;
`;

export const CheckListTotalText = styled.div``;

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

export const TotalPriceText = styled.div`
  margin-left: 50px;
  font-size: 24px;
`;

export const TotalPrice = styled.div`
  font-size: 22px;
  margin-right: -20px;
`;

export const ScrollBox = styled.div`
  height: 380px;
  overflow: scroll;
  border-bottom: 2px solid black;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    width: 4px;
    height: 20px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

export const ItemPriceContainerForm = styled.form`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  border-bottom: 1px solid;
  width: 400px;
  justify-content: space-between;
  margin-left: 23px;
`;
