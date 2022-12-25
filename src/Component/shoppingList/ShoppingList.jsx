import { useState } from 'react';

import { faPencil, faX } from '@fortawesome/free-solid-svg-icons';

import {
  ShoppingListContainer,
  DateContainer,
  DateUnderLine,
  ShoppingListTitle,
  UncheckedList,
  ListItem,
  CheckBox,
  ItemName,
  ItemPrice,
  CheckedList,
  PencilIcon,
  XIcon,
  ItemPriceContainer,
  CheckListTotalContainer,
  CheckListTotalText,
  CheckListTotal,
  OverallTotalContainer,
  OverallTotalTotalText,
  OverallTotal,
  ShowItem,
  UnshowItem,
  ScrollBox,
} from './ShoppingList.js';

const ShoppingList = ({ year, month, date }) => {
  const currentYear = year;
  const currentMonth = month + 1;
  const currentDate = date;

  return (
    <ShoppingListContainer>
      <DateContainer>
        {currentYear}.{currentMonth}.{currentDate}
      </DateContainer>
      <DateUnderLine></DateUnderLine>
      <ShoppingListTitle>쇼핑 목록 +</ShoppingListTitle>
      <ScrollBox>
        <UncheckedList>
          <ListItem>
            <ShowItem>
              <CheckBox type='checkbox' />
              <ItemPriceContainer>
                <ItemName>고구마</ItemName>
                <ItemPrice>5,500원</ItemPrice>
              </ItemPriceContainer>
            </ShowItem>
            <UnshowItem>
              <PencilIcon icon={faPencil} />
              <XIcon icon={faX} />
            </UnshowItem>
          </ListItem>
          <ListItem>
            <ShowItem>
              <CheckBox type='checkbox' />
              <ItemPriceContainer>
                <ItemName>고구마</ItemName>
                <ItemPrice>5,500원</ItemPrice>
              </ItemPriceContainer>
            </ShowItem>
            <UnshowItem>
              <PencilIcon icon={faPencil} />
              <XIcon icon={faX} />
            </UnshowItem>
          </ListItem>
          <ListItem>
            <ShowItem>
              <CheckBox type='checkbox' />
              <ItemPriceContainer>
                <ItemName>고구마</ItemName>
                <ItemPrice>5,500원</ItemPrice>
              </ItemPriceContainer>
            </ShowItem>
            <UnshowItem>
              <PencilIcon icon={faPencil} />
              <XIcon icon={faX} />
            </UnshowItem>
          </ListItem>
          <ListItem>
            <ShowItem>
              <CheckBox type='checkbox' />
              <ItemPriceContainer>
                <ItemName>고구마</ItemName>
                <ItemPrice>5,500원</ItemPrice>
              </ItemPriceContainer>
            </ShowItem>
            <UnshowItem>
              <PencilIcon icon={faPencil} />
              <XIcon icon={faX} />
            </UnshowItem>
          </ListItem>
          <ListItem>
            <ShowItem>
              <CheckBox type='checkbox' />
              <ItemPriceContainer>
                <ItemName>고구마</ItemName>
                <ItemPrice>5,500원</ItemPrice>
              </ItemPriceContainer>
            </ShowItem>
            <UnshowItem>
              <PencilIcon icon={faPencil} />
              <XIcon icon={faX} />
            </UnshowItem>
          </ListItem>
          <ListItem>
            <ShowItem>
              <CheckBox type='checkbox' />
              <ItemPriceContainer>
                <ItemName>고구마</ItemName>
                <ItemPrice>5,500원</ItemPrice>
              </ItemPriceContainer>
            </ShowItem>
            <UnshowItem>
              <PencilIcon icon={faPencil} />
              <XIcon icon={faX} />
            </UnshowItem>
          </ListItem>
          <ListItem>
            <CheckBox type='checkbox' />
            <ItemPriceContainer>
              <ItemName>입력해주세요</ItemName>
              <ItemPrice>-- 원</ItemPrice>
            </ItemPriceContainer>
            <PencilIcon icon={faPencil} />
            <XIcon icon={faX} />
          </ListItem>
          <CheckListTotalContainer>
            <CheckListTotalText>합계</CheckListTotalText>
            <CheckListTotal>244,600원</CheckListTotal>
          </CheckListTotalContainer>
        </UncheckedList>
        <ShoppingListTitle>쇼핑 완료</ShoppingListTitle>
        <CheckedList>
          <ListItem>
            <ShowItem>
              <CheckBox type='checkbox' />
              <ItemPriceContainer>
                <ItemName>당근</ItemName>
                <ItemPrice>3,500원</ItemPrice>
              </ItemPriceContainer>
            </ShowItem>
            <UnshowItem>
              <PencilIcon icon={faPencil} />
              <XIcon icon={faX} />
            </UnshowItem>
          </ListItem>
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
