import { db } from '../../firebase';
import { collection, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import {
  StShopGuidePostWrapper,
  StShopGuidePostContainer,
  StShopGuideTop,
  StShopGuideBottom,
  StShopGuidePostNumbering,
  StShopGuidePostTitle,
  StShopGuidePostInfo,
  StShopGuidePostUserPicture,
  StShopGuidePostUserName,
  StShopGuidePostDate,
  StShopGuidePostDescription,
} from './ShopGuide.js';

const List = () => {
  const [posting, setPosting] = useState([]);

  // firestore에서 데이터 'posting' 가져오기
  const syncpostingstatewithfirestore = () => {
    const q = query(collection(db, 'posting'), orderBy('created', 'desc'));

    getDocs(q).then((querySnapshot) => {
      const firestorePostingList = [];
      querySnapshot.forEach((doc) => {
        firestorePostingList.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          username: doc.data().username,
          created: doc.data().created,
        });
      });
      setPosting(firestorePostingList);
    });
  };

  useEffect(() => {
    syncpostingstatewithfirestore();
  }, []);

  return (
    <div>
      {posting.map((item, i) => {
        return (
          <StShopGuidePostWrapper key={item.id}>
            <StShopGuidePostContainer item={item} to={`/shopguidearticle/${item.id}`}>
              <StShopGuideTop>
                <StShopGuidePostNumbering>{i + 1}</StShopGuidePostNumbering>
                <StShopGuidePostTitle>{item.title}</StShopGuidePostTitle>
              </StShopGuideTop>
              <StShopGuideBottom>
                <StShopGuidePostInfo>
                  <label type={'picture'}></label>
                  <StShopGuidePostUserPicture></StShopGuidePostUserPicture>
                  <StShopGuidePostUserName>{item.username}</StShopGuidePostUserName>
                  <StShopGuidePostDate>{item.created}</StShopGuidePostDate>
                </StShopGuidePostInfo>
                <StShopGuidePostDescription>{item.description}</StShopGuidePostDescription>
              </StShopGuideBottom>
            </StShopGuidePostContainer>
          </StShopGuidePostWrapper>
        );
      })}
    </div>
  );
};

export default List;
