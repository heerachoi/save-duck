import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { db } from '../../firebase.js';
import { collection, addDoc, getDocs, orderBy, query, where } from 'firebase/firestore';

import { v4 as uuidv4 } from 'uuid';
import { faPencil, faX, faCheck } from '@fortawesome/free-solid-svg-icons';
import { addList, loadList } from '../../redux/modules/shoppingListActions.js';
import ShoppingItem from './ShoppingItem.jsx';
// import TotalPrice from '../totalPrice/TotalPrice.jsx';
import {
  ShoppingListContainer,
  DateContainer,
  DateUnderLine,
  ShoppingListTitle,
  UncheckedList,
  ListItem,
  XIcon,
  CheckIcon,
  ItemInput,
  ItemPriceInput,
  ItemPriceInputContainer,
  TotalPrice,
  TotalPriceContainer,
  TotalPriceText,
  ScrollBox,
  ItemPriceContainerForm,
} from './ShoppingList.js';

const ShoppingList = ({ year, month, date }) => {
  const currentYear = year;
  const currentMonth = month + 1;
  const currentDate = date;
  // 현재 날자 - dbCollection
  const dateToString = '' + currentYear + currentMonth + currentDate;

  // item
  const [item, setItem] = useState('');
  const [price, setPrice] = useState();
  const [totalPrice, setTotalPrice] = useState('0');
  const [itemList, setItemList] = useState([]);
  const [check, setCheck] = useState(false);
  // useEffect(() => {}, [itemList, checkedItemList]); // 댓글 등록 버튼 - 클릭시 댓글 리스트에 작성한 댓글 추가

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
          modify: doc.data().modify,
          savetime: doc.data().savetime,
        });
      });
      setItemList(firestoreShoppingItemList);
    });
  };

  // 아이템 작성 인풋창 내용 입력 시 state 업데이트
  const itemChangeHandler = (event) => {
    setItem(event.target.value);
  };

  // const shoppingListChecked = () => {
  //   const q = query(collection(db, dateToString), where('isChecked', '==', true));

  //   getDocs(q).then((querySnapshop) => {
  //     const firestoreShoppingItemListChecked = [];
  //     querySnapshop.forEach((doc) => {
  //       firestoreShoppingItemListChecked.push({
  //         id: doc.id,
  //         date: doc.data().date,
  //         name: doc.data().name,
  //         isChecked: doc.data().isChecked,
  //         price: doc.data().price,
  //       });
  //     });
  //     // console.log('firestoreShoppingItemListChecked');
  //     // console.log(firestoreShoppingItemListChecked);
  //     setCheckedItemList(firestoreShoppingItemListChecked);
  //   });
  // };

  useEffect(() => {
    calculateTotalPrice();
    shoppingListUnchecked();
  }, [dateToString]);

  const addItem = async (newShoppingItem) => {
    const docRef = await addDoc(collection(db, dateToString), {
      id: uuidv4(),
      date: dateToString,
      name: item,
      isChecked: false,
      price,
      modify: false,
    });
    setItemList([
      ...itemList,
      {
        id: uuidv4(),
        date: dateToString,
        name: item,
        isChecked: false,
        price,
        modify: false,
      },
    ]);
    setItem('');
    setPrice('');
  };

  // 입력값 cost에 쉼표 넣주기 (number -> string)
  const numberWithCommas = (cost) => {
    console.log('cost');

    console.log(cost);
    cost = Number(cost);
    cost = cost.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    cost = cost.replace(/,/g, ''); // ,값 공백처리
    return cost.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 정규식을 이용해서 3자리 마다 , 추가
  };

  // 아이템 작성 인풋창 내용 입력 시 state 업데이트
  const priceChangeHandler = (event) => {
    let inputCost = event.target.value;
    console.log('inputCost');
    console.log(inputCost);
    if (inputCost.length > 7) {
      inputCost = inputCost.substr(0, 7);
    }
    setPrice(numberWithCommas(inputCost));
  };

  // 아이템 값들의
  const calculateTotalPrice = () => {
    const q = query(collection(db, dateToString));
    let total = 0;
    getDocs(q).then((querySnapshop) => {
      const ShoppingItemPriceList = [];
      querySnapshop.forEach((doc) => {
        ShoppingItemPriceList.push({
          price: doc.data().price,
        });
      });
      // 아이템이 없다면 총 합계 0으로 출력
      if (ShoppingItemPriceList.length === 0) {
        setTotalPrice(0);
      } else {
        // 아이템이 있다면 총 합계 계산
        for (let i = 0; i < ShoppingItemPriceList.length; i++) {
          let costs = ShoppingItemPriceList[i].price;
          // console.log('costs');
          // console.log(costs);
          let cost = costs.replace(/\,/g, ''); // 문자열에 콤마를 없애준다
          let number = parseInt(cost, 10); // 숫자로 변경
          total += number;
        }
        setTotalPrice(numberWithCommas(total));
      }
    });
  };

  useEffect(() => {
    calculateTotalPrice();
    shoppingListUnchecked();
  }, [dateToString]);

  useEffect(() => {
    calculateTotalPrice();
  }, [price]);

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
            <ItemPriceContainerForm>
              <ItemInput key={item.id} type='text' id='item' placeholder='입력해주세요.' onChange={itemChangeHandler} value={item} maxLength='25' />
              <ItemPriceInputContainer>
                <ItemPriceInput id='itemPrice' placeholder='---,---' onChange={priceChangeHandler} value={price || ''} />원
              </ItemPriceInputContainer>
            </ItemPriceContainerForm>
            <CheckIcon onClick={addItem} icon={faCheck} />
            <XIcon icon={faX} />
          </ListItem>
        </UncheckedList>
      </ScrollBox>
      <TotalPriceContainer>
        <TotalPriceText>총 합계</TotalPriceText>
        <TotalPrice>{totalPrice}원</TotalPrice>
      </TotalPriceContainer>
    </ShoppingListContainer>
  );
};

export default ShoppingList;