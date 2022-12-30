import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { modifyModeList } from '../../redux/modules/shoppingListActions.js';
import { doc, deleteDoc, updateDoc, query, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';
import { faPencil, faX, faCheck } from '@fortawesome/free-solid-svg-icons';

import { ListItem, CheckBox, ItemName, ItemPrice, PencilIcon, XIcon, ItemPriceContainer, ShowItem, UnshowItem, CheckIcon, ItemInput, ItemPriceInput, ItemPriceInputContainer } from './ShoppingItem.js';

const ShoppingItem = ({ item, shoppingListUnchecked, dateToString, calculateTotalPrice }) => {
  const time = moment().format('YYYY-MM-DD-hh:mm');
  const { id, name, date, price, modify, isChecked, savetime } = item;
  const [readOnly, setReadOnly] = useState(true);
  const [updateItemInput, setUpdateItemInput] = useState(name);
  const [updateItemPrice, setUpdateItemPrice] = useState(price);
  const [inputDate, setInputDate] = useState(dateToString);
  const [totalPrice, setTotalPrice] = useState('0');

  const dispatch = useDispatch();

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
    let inputCost = event.target.value;
    console.log('item inputCost');
    console.log(inputCost);
    console.log('inputCost.length');
    if (inputCost.length === 0) {
      // input이 없을 경우 0으로 처리
      setUpdateItemPrice('0');
    } else {
      console.log(inputCost.length);
      let cost = inputCost.replace(/\,/g, ''); // 문자열에 콤마를 없애준다
      let number = parseInt(cost, 10); // 숫자로 변경
      // console.log('item number');
      // console.log(number);
      number = number + '';
      if (number.length > 7) {
        number = number.substr(0, 7);
      }
      // console.log('onChangeItemPrice');
      // console.log(number);
      const numberToComma = addCommaToNumber(number);
      // console.log('update price');

      // console.log(numberToComma);
      setUpdateItemPrice(numberToComma);
    }
  };
  // console.log('changed');

  // console.log(updateItemPrice);
  // 목록 수정 -> 완료 모드 토글링
  const updateItemModify = async (id) => {
    // console.log('updateItemModify: 수정 시작');
    // console.log('id');
    // console.log(id);
    const docRef = doc(db, dateToString, item.id);
    // console.log('docRef');
    // console.log(docRef);
    try {
      // priceChangeHandler;
      const response = await updateDoc(docRef, {
        modify: true,
        name: updateItemInput,
        price: updateItemPrice,
      });
      // console.log('response');
      // console.log(response);
    } catch (event) {
      // console.log('event');
      // console.log(event);
    } finally {
      console.log('수정 완료 end');
      modifyItemButtonHandler(id);
    }
    shoppingListUnchecked();
  };

  // 목록 수정 완료하기
  const updateCompleteButtonHandler = async (id) => {
    console.log('댓글 수정 완료하기');
    const docRef = doc(db, dateToString, id);
    try {
      const response = await updateDoc(docRef, {
        modify: false,
        savetime: time,
        name: updateItemInput,
        price: updateItemPrice,
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
    // console.log('last change');
    // console.log(updateItemPrice);
    setUpdateItemPrice(updateItemPrice);
    calculateTotalPrice();
  };

  // 목록 수정 취소하기
  const editCancelButtonHandler = (id) => {
    // console.log('댓글 수정 취소하기');
    dispatch(modifyModeList(id));
    setReadOnly(true);
    setUpdateItemInput(name);
    setUpdateItemPrice(price);
  };

  // 목록 삭제하기
  const deleteItemButtonHandler = async (removedItem) => {
    // console.log('removedItem');
    // console.log(removedItem);
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const listRef = doc(db, dateToString, removedItem);
      // console.log(listRef);
      await deleteDoc(listRef);
      shoppingListUnchecked();
      calculateTotalPrice();
      // shoppingListChecked();
    } else {
      return;
    }
  };

  // 입력값 cost에 쉼표 넣주기 (number -> string)
  const numberWithCommas = (cost) => {
    // console.log('cost');

    // console.log(cost);
    // cost = Number(cost);
    cost = cost.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    cost = cost.replace(/,/g, ''); // ,값 공백처리
    return cost.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 정규식을 이용해서 3자리 마다 , 추가
  };

  // 입력값 cost에 쉼표 넣주기 (number -> string)
  const addCommaToNumber = (cost) => {
    // console.log('addCommaToNumber');
    cost = cost + '';
    cost = cost.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    cost = cost.replace(/,/g, ''); // ,값 공백처리
    console.log(cost.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    return cost.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 정규식을 이용해서 3자리 마다 , 추가
  };

  // 아이템 값들의
  // const calculateTotalPrice = () => {
  //   const q = query(collection(db, dateToString));
  //   let total = 0;
  //   getDocs(q).then((querySnapshop) => {
  //     const ShoppingItemPriceList = [];
  //     querySnapshop.forEach((doc) => {
  //       ShoppingItemPriceList.push({
  //         price: doc.data().price,
  //       });
  //     });
  //     // 아이템이 없다면 총 합계 0으로 출력
  //     if (ShoppingItemPriceList.length === 0) {
  //       setTotalPrice('0');
  //     } else {
  //       // 아이템이 있다면 총 합계 계산
  //       for (let i = 0; i < ShoppingItemPriceList.length; i++) {
  //         let costs = ShoppingItemPriceList[i].price;
  //         // console.log('costs');
  //         // console.log(costs);
  //         let cost = costs.replace(/\,/g, ''); // 문자열에 콤마를 없애준다
  //         let number = parseInt(cost, 10); // 숫자로 변경
  //         total += number;
  //       }
  //       // 더해진 값에 다시 comma 추가
  //       console.log('calculateTotalPrice');
  //       setTotalPrice(addCommaToNumber(total));
  //     }
  //   });
  // };

  useEffect(() => {
    calculateTotalPrice();
  }, [updateItemPrice]);

  return (
    <ListItem key={id}>
      <ShowItem>
        <CheckBox type='checkbox' value='false' />
        <ItemPriceContainer>
          <ItemInput type='text' name='name' readOnly={readOnly} defaultValue={name} onChange={onChangeItem} maxLength='25' value={updateItemInput || ''} />
          <ItemPriceInputContainer>
            <ItemPriceInput id='itemPrice' onChange={onChangeItemPrice} defaultValue={price || '0'} maxLength='7' value={updateItemPrice || '0'} />원
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
