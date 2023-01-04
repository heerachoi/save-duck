import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  margin-bottom: 15px;
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

export const ItemPriceInputContainer = styled.div``;

// check box 조금 더 찾아보기
export const CheckBox = styled.input`
  border-radius: 40%;
  cursor: pointer;
  margin-right: 10px;
`;

export const XIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

export const CheckIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: 10px;
  font-size: 14px;
`;

export const ItemInput = styled.input`
  width: 310px;
  height: 8px;
  padding: 4px 0px;
  border: none;
`;

export const ItemPriceInput = styled.input`
  width: 50px;
  height: 8px;
  padding: 4px 0px;
  border: none;
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

export const TotalPriceText = styled.div``;

export const TotalPrice = styled.div``;

export const ScrollBox = styled.div`
  height: 380px;
  overflow: scroll;
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
