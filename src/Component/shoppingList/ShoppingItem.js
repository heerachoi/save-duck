import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  margin: 0;
`;

export const ItemPriceInput = styled.input`
  width: 65px;
  height: 8px;
  padding: 4px 0px;
  border: none;
`;

export const ItemPriceInputContainer = styled.div``;
