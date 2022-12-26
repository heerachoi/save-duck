import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteList, loadList, modifyModeList, updateList, checkList } from '../../redux/modules/shoppingListActions.js';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import { faPencil, faX, faCheck } from '@fortawesome/free-solid-svg-icons';

import { ListItem, CheckBox, ItemName, ItemPrice, PencilIcon, XIcon, ItemPriceContainer, ShowItem, UnshowItem } from './ShoppingItem.js';

const ShoppingItem = ({ item, shoppingListUnchecked, shoppingListChecked, dateToString, onRemoveClick }) => {
  const { id, name, date, price, modify, isChecked } = item;
  const [readOnly, setReadOnly] = useState(true);
  const [updateItemInput, setUpdateItemInput] = useState(item);
  const [inputDate, setInputDate] = useState(dateToString);

  const dispatch = useDispatch();

  // 댓글 수정하기
  const modifyItemButtonHandler = (id) => {
    console.log('수정 완료!');
    dispatch(modifyModeList(id));
    setReadOnly(false);
  };

  const onChangeList = (event) => {
    const { value } = event.target;
    setUpdateItemInput(value);
  };

  // 댓글 수정 완료하기
  const updateCompleteButtonHandler = (item) => {
    dispatch(updateList(item));
    dispatch(modifyModeList(id));
    setReadOnly(true);
  };

  // 댓글 수정 취소하기
  const editCancelButtonHandler = (id) => {
    dispatch(modifyModeList(id));
    setReadOnly(true);
  };

  // 댓글 삭제하기
  const deleteItemButtonHandler = async (removedItem) => {
    // console.log('removedItem');
    // console.log(removedItem);

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const listRef = doc(db, dateToString, removedItem);
      console.log(listRef);
      await deleteDoc(listRef);
      shoppingListUnchecked();
      shoppingListChecked();
    } else {
      return;
    }
  };

  // Check 버튼 실행
  const toggleDoneHandler = (id) => {
    // console.log(id);
    dispatch(checkList({ id }));
    shoppingListUnchecked();
    shoppingListChecked();
  };
  return (
    <ListItem key={id}>
      <ShowItem>
        <CheckBox type='checkbox' />
        <ItemPriceContainer>
          <ItemName>{name}</ItemName>
          <ItemPrice>{price}원</ItemPrice>
        </ItemPriceContainer>
      </ShowItem>
      <UnshowItem>
        <PencilIcon
          icon={faPencil}
          onClick={() => {
            updateCompleteButtonHandler();
          }}
        />
        <XIcon
          icon={faX}
          onClick={() => {
            deleteItemButtonHandler(id);
          }}
        />
      </UnshowItem>
    </ListItem>
  );
};

export default ShoppingItem;
