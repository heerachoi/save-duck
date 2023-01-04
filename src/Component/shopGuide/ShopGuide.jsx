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
            <StShopGuidePostContainer
              item={item}
              to={`/shopguidearticle/${item.id}`}
            >
              <StShopGuideTop>
                <StShopGuidePostNumbering>{i + 1}</StShopGuidePostNumbering>
              </StShopGuideTop>

              <StShopGuideBottom>
                <StShopGuidePostTitle>{item.title}</StShopGuidePostTitle>
                <StShopGuidePostInfo>
                  <label type={"picture"}></label>
                  <StShopGuidePostUserPicture>
                    작성자 프로필 사진
                  </StShopGuidePostUserPicture>
                  <StShopGuidePostUserName>
                    {item.username} 작성자 닉네임
                  </StShopGuidePostUserName>
                  <StShopGuidePostDate>{item.created}</StShopGuidePostDate>
                </StShopGuidePostInfo>

                <StShopGuidePostDescription>
                  {item.description}
                </StShopGuidePostDescription>
              </StShopGuideBottom>
            </StShopGuidePostContainer>
          </StShopGuidePostWrapper>
        );
      })}
    </div>
  );
};

export default List;
// @media screen and (max-width: 800px) {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 0px;
// }