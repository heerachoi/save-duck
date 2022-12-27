import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { modifyModeList } from '../../redux/modules/shoppingListActions.js';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import { faPencil, faX, faCheck } from '@fortawesome/free-solid-svg-icons';

import { ListItem, CheckBox, ItemName, ItemPrice, PencilIcon, XIcon, ItemPriceContainer, ShowItem, UnshowItem, CheckIcon, ItemInput, ItemPriceInput, ItemPriceInputContainer } from './ShoppingItem.js';

const ShoppingItem = ({ item, shoppingListUnchecked, dateToString }) => {
  const time = moment().format('YYYY-MM-DD-hh:mm');
  const { id, name, date, price, modify, isChecked, savetime } = item;
  const [readOnly, setReadOnly] = useState(true);
  const [updateItemInput, setUpdateItemInput] = useState(name);
  const [updateItemPrice, setUpdateItemPrice] = useState(price);
  const [inputDate, setInputDate] = useState(dateToString);

  const dispatch = useDispatch();

  // 댓글 수정 -> 완료 모드 토글링
  // const toggleDoneHandler = async (id) => {
  //   const docRef = doc(db, dateToString, item.id);
  //   try {
  //     const response = await updateDoc(docRef, { modify: false });
  //     console.log(response);
  //   } catch (event) {
  //     console.log(event);
  //   } finally {
  //     console.log('end');
  //     // modifyItemButtonHandler(id);
  //   }
  //   shoppingListUnchecked();
  //   // shoppingListChecked();
  // };

  // 목록 수정 -> 완료 모드 토글링 state에 반영하기
  const modifyItemButtonHandler = (id) => {
    // console.log('modifyItemButtonHandler 수정, 완료 상태 변경');
    dispatch(modifyModeList(id));
    setReadOnly(false);
  };

  // 목록 입력시 - state 반영하기
  const onChangeItem = (event) => {
    // console.log(event.target);
    const { value } = event.target;
    // console.log(value);
    setUpdateItemInput(value);
  };

  // 가격 입력시 - state 반영하기
  const onChangeItemPrice = (event) => {
    // console.log(' 가격 입력시 - state 반영하기');
    const { value } = event.target;
    // console.log('onChangeItemPrice');

    console.log(value);
    setUpdateItemPrice(value);
  };

  // 댓글 수정 -> 완료 모드 토글링
  const updateItemModify = async (id) => {
    // console.log('updateItemModify: 수정 시작');
    // console.log('id');
    // console.log(id);
    const docRef = doc(db, dateToString, item.id);
    // console.log('docRef');
    // console.log(docRef);
    try {
      const response = await updateDoc(docRef, { modify: true, name: updateItemInput });
      // console.log('response');
      // console.log(response);
    } catch (event) {
      // console.log(event);
    } finally {
      // console.log('수정 완료 end');
      modifyItemButtonHandler(id);
    }
    shoppingListUnchecked();
    // shoppingListChecked();
  };

  // 댓글 수정 완료하기
  const updateCompleteButtonHandler = async (id) => {
    console.log('댓글 수정 완료하기');
    const docRef = doc(db, dateToString, id);
    try {
      const response = await updateDoc(docRef, {
        modify: false,
        savetime: time,
        name: updateItemInput,
      });
      // console.log(response);
    } catch (event) {
      // console.log(event);
    } finally {
      // console.log('end');
      modifyItemButtonHandler(id);
    }
    shoppingListUnchecked();
    setReadOnly(true);
  };

  // 댓글 수정 취소하기
  const editCancelButtonHandler = (id) => {
    // console.log('댓글 수정 취소하기');
    dispatch(modifyModeList(id));
    setReadOnly(true);
    setUpdateItemInput(name);
    setUpdateItemPrice(price);
  };

  // 댓글 삭제하기
  const deleteItemButtonHandler = async (removedItem) => {
    // console.log('removedItem');
    // console.log(removedItem);
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const listRef = doc(db, dateToString, removedItem);
      // console.log(listRef);
      await deleteDoc(listRef);
      shoppingListUnchecked();
      // shoppingListChecked();
    } else {
      return;
    }
  };

  return (
    <ListItem key={id}>
      <ShowItem>
        <CheckBox type='checkbox' value='false' />
        <ItemPriceContainer>
          <ItemInput type='text' name='name' readOnly={readOnly} defaultValue={name} onChange={onChangeItem} maxLength='25' />
          <ItemPriceInputContainer>
            <ItemPriceInput id='itemPrice' onChange={onChangeItemPrice} defaultValue={price || ''} />원
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
          <XIcon
            icon={faX}
            onClick={() => {
              editCancelButtonHandler(id);
            }}
          />
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
