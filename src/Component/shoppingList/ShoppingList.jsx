import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { db } from '../../firebase.js';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
  doc,
} from 'firebase/firestore';

import { v4 as uuidv4 } from 'uuid';
import { faPencil, faX, faCheck } from '@fortawesome/free-solid-svg-icons';
import { addList, loadList } from '../../redux/modules/shoppingListActions.js';
import ShoppingItem from './ShoppingItem.jsx';
import moment from 'moment';
import { useAuth } from '../../firebase.js';

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
  const currentUser = useAuth();
  // console.log('shoppinglist current user');
  // console.log(currentUser);
  const currentYear = year;
  const currentMonth = month + 1;
  const currentDate = date;
  // 현재 날자 - dbCollection
  const dateToString = '' + currentYear + currentMonth + currentDate;

  // item
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('0');
  const [itemList, setItemList] = useState([]);

  const shoppingListUnchecked = () => {
    const q = query(
      collection(db, 'itemList'),
      where('userId', '==', currentUser.uid),
      where('date', '==', dateToString)
    );

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
          userId: doc.data().userId,
        });
      });
      setItemList(firestoreShoppingItemList);
    });
  };
  // 아이템 작성 인풋창 내용 입력 시 state 업데이트
  const itemChangeHandler = (event) => {
    setItem(event.target.value);
  };

  const addItem = async (newShoppingItem) => {
    const docRef = await addDoc(collection(db, 'itemList'), {
      id: uuidv4(),
      date: dateToString,
      name: item,
      isChecked: false,
      price,
      modify: false,
      savetime: moment().format('YYYY-MM-DD-hh:mm'),
      userId: currentUser.uid,
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
        savetime: moment().format('YYYY-MM-DD-hh:mm'),
        userId: currentUser.uid,
      },
    ]);
    setItem('');
    setPrice('');
  };

  // 입력값 cost에 쉼표 넣주기 (number -> string)
  const addCommaToNumber = (cost) => {
    cost = cost + '';
    cost = cost.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    cost = cost.replace(/,/g, ''); // ,값 공백처리
    return cost.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 정규식을 이용해서 3자리 마다 , 추가
  };

  // 아이템 작성 인풋창 내용 입력 시 state 업데이트
  const priceChangeHandler = (event) => {
    let inputCost = event.target.value;
    if (inputCost.length === 0) {
      setPrice('0');
    } else {
      let cost = inputCost.replace(/\,/g, ''); // 문자열에 콤마를 없애준다
      let number = parseInt(cost, 10); // 숫자로 변경
      number = number + '';
      if (number.length > 7) {
        number = number.substr(0, 7);
      }
      setPrice(addCommaToNumber(number));
    }
  };

  // 아이템 값들의
  const calculateTotalPrice = async () => {
    const usersCollectionRef = collection(db, 'itemList');

    const q = await query(
      usersCollectionRef,
      where('userId', '==', currentUser.uid),
      where('date', '==', dateToString)
    );
    let total = 0;
    let number = 0;
    getDocs(q).then((querySnapshop) => {
      const ShoppingItemPriceList = [];
      querySnapshop.forEach((doc) => {
        ShoppingItemPriceList.push({
          price: doc.data().price,
        });
      });
      // 아이템이 없다면 총 합계 0으로 출력
      if (ShoppingItemPriceList.length === 0) {
        setTotalPrice('0');
      } else {
        // 아이템이 있다면 총 합계 계산
        for (let i = 0; i < ShoppingItemPriceList.length; i++) {
          let costs = ShoppingItemPriceList[i].price;
          if (costs.length === 0) {
            number = 0;
          } else {
            let cost = costs.replace(/\,/g, ''); // 문자열에 콤마를 없애준다
            number = parseInt(cost, 10); // 숫자로 변경
          }
          total += number;
        }
        // 더해진 값에 다시 comma 추가
        setTotalPrice(addCommaToNumber(total));
      }
    });
  };

  useEffect(() => {
    if (!currentUser) return;
    calculateTotalPrice();
    shoppingListUnchecked();
  }, [dateToString, currentUser, price]);

  return (
    <ShoppingListContainer>
      <DateContainer>
        {currentYear} . {currentMonth} . {currentDate}
      </DateContainer>
      <DateUnderLine></DateUnderLine>
      <ShoppingListTitle>Shopping List</ShoppingListTitle>
      <ScrollBox>
        <UncheckedList>
          {itemList.map((item) => {
            return (
              <ShoppingItem
                key={item.id}
                item={item}
                shoppingListUnchecked={shoppingListUnchecked}
                calculateTotalPrice={calculateTotalPrice}
                dateToString={dateToString}
              />
            );
          })}

          <ListItem>
            <ItemPriceContainerForm>
              <ItemInput
                key={item.id}
                type='text'
                id='item'
                placeholder='I need...'
                onChange={itemChangeHandler}
                value={item}
                maxLength='25'
              />
              <ItemPriceInputContainer>
                <ItemPriceInput
                  id='itemPrice'
                  placeholder='---,---'
                  onChange={priceChangeHandler}
                  value={price || ''}
                />
                ₩
              </ItemPriceInputContainer>
            </ItemPriceContainerForm>
            <CheckIcon onClick={addItem} icon={faCheck} />
            <XIcon icon={faX} />
          </ListItem>
        </UncheckedList>
      </ScrollBox>
      <TotalPriceContainer>
        <TotalPriceText>Total</TotalPriceText>
        <TotalPrice>{totalPrice} ₩</TotalPrice>
      </TotalPriceContainer>
    </ShoppingListContainer>
  );
};

export default ShoppingList;
