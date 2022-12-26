import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { db } from '../../firebase.js';
import { collection, addDoc, getDocs, orderBy, query, where } from 'firebase/firestore';

import { v4 as uuidv4 } from 'uuid';
import { faPencil, faX, faCheck } from '@fortawesome/free-solid-svg-icons';
import { addList, loadList } from '../../redux/modules/shoppingListActions.js';
import ShoppingItem from './ShoppingItem.jsx';

import {
  ShoppingListContainer,
  DateContainer,
  DateUnderLine,
  ShoppingListTitle,
  UncheckedList,
  ListItem,
  CheckedList,
  XIcon,
  CheckIcon,
  ItemInput,
  ItemPriceInput,
  ItemPriceInputContainer,
  CheckListTotalContainer,
  CheckListTotalText,
  CheckListTotal,
  OverallTotalContainer,
  OverallTotalTotalText,
  OverallTotal,
  ScrollBox,
  ItemPriceContainerForm,
} from './ShoppingList.js';

const ShoppingList = ({ year, month, date }) => {
  const currentYear = year;
  const currentMonth = month + 1;
  const currentDate = date;
  // 현재 날자 - dbCollection
  const dateToString = '' + currentYear + currentMonth + currentDate;
  // console.log('dateToString');
  // console.log(dateToString);

  // item
  const [item, setItem] = useState('');
  const [cost, setCost] = useState('');
  const [itemList, setItemList] = useState([]);
  const [checkedItemList, setCheckedItemList] = useState([]);
  const [check, setCheck] = useState(false);

  const dispatch = useDispatch();
  // useEffect(() => {}, [itemList, checkedItemList]); // 댓글 등록 버튼 - 클릭시 댓글 리스트에 작성한 댓글 추가
  const itemSubmitHandler = (event) => {
    event.preventDefault();
    const newItem = {
      id: uuidv4(),
      item,
      date,
      price: 0,
      isChecked: false,
    };
    dispatch(addList(newItem));
    setItem('');
    setCost('');
  };

  // 아이템 작성 인풋창 내용 입력 시 state 업데이트
  const itemChangeHandler = (event) => {
    setItem(event.target.value);
  };

  // 아이템 작성 인풋창 내용 입력 시 state 업데이트
  const priceChangeHandler = (event) => {
    setCost(event.target.value);
  };

  const shoppingListUnchecked = () => {
    const q = query(collection(db, dateToString), where('isChecked', '==', false));

    getDocs(q).then((querySnapshop) => {
      const firestoreShoppingItemList = [];
      querySnapshop.forEach((doc) => {
        firestoreShoppingItemList.push({
          id: doc.id,
          date: doc.data().date,
          name: doc.data().name,
          isChecked: doc.data().isChecked,
          price: doc.data().price,
        });
      });
      // console.log('firestoreShoppingItemList');
      // console.log(firestoreShoppingItemList);
      setItemList(firestoreShoppingItemList);
    });
  };

  const shoppingListChecked = () => {
    const q = query(collection(db, dateToString), where('isChecked', '==', true));

    getDocs(q).then((querySnapshop) => {
      const firestoreShoppingItemListChecked = [];
      querySnapshop.forEach((doc) => {
        firestoreShoppingItemListChecked.push({
          id: doc.id,
          date: doc.data().date,
          name: doc.data().name,
          isChecked: doc.data().isChecked,
          price: doc.data().price,
        });
      });
      // console.log('firestoreShoppingItemListChecked');
      // console.log(firestoreShoppingItemListChecked);
      setCheckedItemList(firestoreShoppingItemListChecked);
    });
  };

  useEffect(() => {
    shoppingListUnchecked();
    shoppingListChecked();
  }, [dateToString]);

  const addItem = async (newShoppingItem) => {
    const docRef = await addDoc(collection(db, dateToString), {
      date: dateToString,
      name: item,
      isChecked: false,
      price: cost,
      modify: false,
    });
    setItemList([
      ...itemList,
      {
        date: dateToString,
        name: item,
        isChecked: false,
        price: cost,
        modify: false,
      },
    ]);
  };

  // 체크 되지 않은 목록 예상 지출
  const futureExpenditure = () => {};

  const currentExpenditure = () => {};

  return (
    <ShoppingListContainer>
      <DateContainer>
        {currentYear}.{currentMonth}.{currentDate}
      </DateContainer>
      <DateUnderLine></DateUnderLine>
      <ShoppingListTitle>쇼핑 목록 +</ShoppingListTitle>
      <ScrollBox>
        <UncheckedList>
          {itemList.map((item) => {
            return <ShoppingItem key={item.id} item={item} shoppingListUnchecked={shoppingListUnchecked} dateToString={dateToString} />;
          })}
          <ListItem>
            <ItemPriceContainerForm onSubmit={itemSubmitHandler}>
              <ItemInput id='item' placeholder='입력해주세요.' onChange={itemChangeHandler} />
              <ItemPriceInputContainer>
                <ItemPriceInput id='itemPrice' placeholder='---' onChange={priceChangeHandler} />원
              </ItemPriceInputContainer>
            </ItemPriceContainerForm>
            <CheckIcon onClick={addItem} icon={faCheck} />
            <XIcon icon={faX} />
          </ListItem>
          <CheckListTotalContainer>
            <CheckListTotalText>합계</CheckListTotalText>
            <CheckListTotal>244,600원</CheckListTotal>
          </CheckListTotalContainer>
        </UncheckedList>
        <ShoppingListTitle>쇼핑 완료</ShoppingListTitle>
        <CheckedList>
          <div>
            {checkedItemList.map((item) => {
              return <ShoppingItem key={item.id} item={item} shoppingListChecked={shoppingListChecked} dateToString={dateToString} onRemoveClick={item.onRemoveClick} />;
            })}
          </div>
          <CheckListTotalContainer>
            <CheckListTotalText>합계</CheckListTotalText>
            <CheckListTotal>244,600원</CheckListTotal>
          </CheckListTotalContainer>
        </CheckedList>
      </ScrollBox>
      <OverallTotalContainer>
        <OverallTotalTotalText>총 합계</OverallTotalTotalText>
        <OverallTotal>244,600원</OverallTotal>
      </OverallTotalContainer>
    </ShoppingListContainer>
  );
};

export default ShoppingList;
