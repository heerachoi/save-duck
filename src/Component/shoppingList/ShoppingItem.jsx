import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { modifyModeList } from '../../redux/modules/shoppingListActions.js';
import {
  doc,
  deleteDoc,
  updateDoc,
  query,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { faPencil, faX, faCheck } from '@fortawesome/free-solid-svg-icons';

import {
  ListItem,
  CheckBox,
  ItemName,
  ItemPrice,
  PencilIcon,
  XIcon,
  ItemPriceContainer,
  ShowItem,
  UnshowItem,
  CheckIcon,
  ItemInput,
  ItemPriceInput,
  ItemPriceInputContainer,
} from './ShoppingItem.js';

const ShoppingItem = ({
  item,
  shoppingListUnchecked,
  dateToString,
  calculateTotalPrice,
}) => {
  const time = moment().format('YYYY-MM-DD-hh:mm');
  const { id, name, date, price, modify, isChecked, savetime, userId } = item;
  const [readOnly, setReadOnly] = useState(true);
  const [updateItemInput, setUpdateItemInput] = useState(name);
  const [updateItemPrice, setUpdateItemPrice] = useState(price);
  const [checked, setChecked] = useState(isChecked);
  const dispatch = useDispatch();

  // 목록 수정 -> 완료 모드 토글링 state에 반영하기
  const modifyItemButtonHandler = (id) => {
    dispatch(modifyModeList(id));
    setReadOnly(false);
  };

  // 목록 입력시 - state 반영하기
  const onChangeItem = (event) => {
    const { value } = event.target;
    setUpdateItemInput(value);
  };

  // 가격 입력시 - state 반영하기
  const onChangeItemPrice = (event) => {
    let inputCost = event.target.value;
    if (inputCost.length === 0) {
      setUpdateItemPrice('0'); // input이 없을 경우 0으로 처리
    } else {
      let cost = inputCost.replace(/\,/g, ''); // 문자열에 콤마를 없애준다
      let number = parseInt(cost, 10); // 숫자로 변경
      number = number + '';
      if (number.length > 7) {
        number = number.substr(0, 7);
      }
      const numberToComma = addCommaToNumber(number);
      setUpdateItemPrice(numberToComma);
    }
  };

  // 목록 완료 체크 토글링
  const itemDoneToggle = async (id) => {
    const docRef = doc(db, 'itemList', item.id);
    setChecked(!checked);
    try {
      const response = await updateDoc(docRef, {
        isChecked: !checked,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 목록 수정 -> 완료 모드 토글링
  const updateItemModify = async (id) => {
    const docRef = doc(db, 'itemList', item.id);
    try {
      const response = await updateDoc(docRef, {
        modify: true,
        name: updateItemInput,
        price: updateItemPrice,
      });
    } catch (event) {
    } finally {
      modifyItemButtonHandler(id);
    }
    shoppingListUnchecked();
  };

  // 목록 수정 완료하기
  const updateCompleteButtonHandler = async (id) => {
    const docRef = doc(db, 'itemList', id);
    try {
      const response = await updateDoc(docRef, {
        modify: false,
        savetime: time,
        name: updateItemInput,
        price: updateItemPrice,
      });
    } catch (event) {
    } finally {
      modifyItemButtonHandler(id);
    }
    shoppingListUnchecked();
    setReadOnly(true);
    setUpdateItemPrice(updateItemPrice);
    calculateTotalPrice();
  };

  // 목록 삭제하기
  const deleteItemButtonHandler = async (removedItem) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const listRef = doc(db, 'itemList', removedItem);
      await deleteDoc(listRef);
      shoppingListUnchecked();
      calculateTotalPrice();
    } else {
      return;
    }
  };

  // 입력값 cost에 쉼표 넣주기 (number -> string)
  const addCommaToNumber = (cost) => {
    cost = cost + '';
    cost = cost.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    cost = cost.replace(/,/g, ''); // ,값 공백처리
    return cost.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 정규식을 이용해서 3자리 마다 , 추가
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [updateItemPrice]);

  return (
    <ListItem key={id}>
      <ShowItem>
        <CheckBox
          type='checkbox'
          // value='false'
          checked={checked}
          onChange={() => {
            itemDoneToggle();
          }}
        />
        <ItemPriceContainer>
          <ItemInput
            type='text'
            name='name'
            readOnly={readOnly}
            onChange={onChangeItem}
            maxLength='25'
            value={updateItemInput || ''}
          />
          <ItemPriceInputContainer>
            <ItemPriceInput
              id='itemPrice'
              onChange={onChangeItemPrice}
              maxLength='7'
              value={updateItemPrice || '0'}
            />
            ₩
          </ItemPriceInputContainer>
        </ItemPriceContainer>
      </ShowItem>
      <UnshowItem>
        {modify ? (
          <CheckIcon
            onClick={() => {
              updateCompleteButtonHandler(id);
            }}
            icon={faCheck}
          />
        ) : (
          <PencilIcon
            icon={faPencil}
            onClick={() => {
              updateItemModify(id);
            }}
          />
        )}
        {modify ? (
          ''
        ) : (
          <XIcon
            icon={faX}
            onClick={() => {
              deleteItemButtonHandler(id);
            }}
          />
        )}
      </UnshowItem>
    </ListItem>
  );
};

export default ShoppingItem;
