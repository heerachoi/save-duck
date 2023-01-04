import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { modifyModeComment, updateComment } from '../../redux/modules/comment';
import {
  doc,
  deleteDoc,
  updateDoc,
  query,
  getDoc,
  getDocs,
  collection,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import {
  StCommentProfileImage,
  StCommentListContainer,
  StCommentUserName,
  StCommentContentInput,
  StCommentContentSaveTime,
  StCommentContentsEditButton,
  StCommentContentsDeleteButton,
} from './ShopGuideDetailsComment.js';
import { useAuth } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { ref, getDownloadURL, getStorage, listAll } from 'firebase/storage';
import { storage } from '../../firebase.js';

const ShopGuideDetailsComment = ({
  item,
  syncCommentListStateWithFirestore,
  collectionName,
  commentItemtList,
  setCommentItemList,
}) => {
  const time = moment().format('YYYY-MM-DD-hh:mm');
  const { id, comment, savetime, modify } = item;
  const [readOnly, setReadOnly] = useState(true);
  const [updateCommentInput, setUpdateCommentInput] = useState(comment);
  const dispatch = useDispatch();
  //! 민성 수정 
  const [photoURL, setPhotoURL] = useState(``);
  const [commentList, setCommentList] = useState([]);
  const [users, setUsers] = useState([]);
  const storage = getStorage();
  //! 민성 수정
  const auth = getAuth();
  // console.log(auth);
  const currentUser = auth.currentUser;
  // console.log(currentUser);

  // console.log(currentUser.uid);

  // 댓글 수정 -> 완료 모드 토글링 state에 반영하기
  const modifyCommentButtonHandler = (id) => {
    dispatch(modifyModeComment(id));
    setReadOnly(false);
  };

  // 댓글 입력시 - state 반영하기
  const onChangeComment = (event) => {
    const { value } = event.target;
    setUpdateCommentInput(value);
  };

  // 댓글 수정 -> 완료 모드 토글링
  const updateCommentModify = async (id) => {
    const docRef = doc(db, 'commentList', id);
    // console.log(docRef);
    try {
      const response = await updateDoc(docRef, { modify: true });
      console.log(response);
    } catch (event) {
      console.log('error', event);
    } finally {
      console.log('edit mode toggled');
      modifyCommentButtonHandler(id);
    }
    syncCommentListStateWithFirestore();
  };

  // 댓글 수정 완료하기
  const updateCompleteButtonHandler = async (id) => {
    const docRef = doc(db, 'commentList', id);
    try {
      await updateDoc(docRef, {
        modify: false,
        savetime: time,
        comment: updateCommentInput,
      });
      // console.log(response);
    } catch (event) {
      console.log(event);
    } finally {
      console.log('comment updated');
      modifyCommentButtonHandler(id);
      alert('수정이 완료되었습니다.');
    }
    setUpdateCommentInput(updateCommentInput);
    syncCommentListStateWithFirestore();
    setReadOnly(true);
  };

  // 댓글 수정 취소하기
  const editCancelButtonHandler = async (item) => {
    console.log(item);
    const docRef = doc(db, 'commentList', item.id);
    // console.log(docRef.comment);
    // console.log(comment);
    try {
      await updateDoc(docRef, {
        modify: false,
        comment: comment,
      });
      // console.log(response);
    } catch (event) {
      console.log(event);
    } finally {
      console.log('comment update canceled');
      modifyCommentButtonHandler(item.id);
      alert('수정이 취소되었습니다.');
    }
    setUpdateCommentInput(item.comment);
    // setUpdateCommentInput(value);
    // dispatch(modifyModeComment(id));
    syncCommentListStateWithFirestore();
    setReadOnly(true);
  };

  // 댓글 삭제하기
  const deleteCommentButtonHandler = async (removedComment) => {
    console.log(removedComment);

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const commentRef = doc(db, 'commentList', removedComment);
      await deleteDoc(commentRef);
      syncCommentListStateWithFirestore();
    } else {
      return;
    }
  };

  // 닉네임 불러오기

  const syncUserInfoWithFirestore = () => {
    const q = query(
      collection(db, 'users')
      // where('postingId', '==', CurrentPostingId),
      // !orderBy('savetime', 'desc')
    );
    console.log(q);
  };

  useEffect(() => {
    syncCommentListStateWithFirestore();
  }, []);

  // useEffect(() => {
  //   if (!currentUser) return;
  //   // userdeleteCheck();
  // }, [currentUser]);

  //! 민성 수정
  //! db에서 'commentList' 컬렉션의 'creatorId' 필드를 가져오기
  const getCreatorId = async (uid, id) => {
    const q = query(collection(db, 'commentList'));
    getDocs(q).then((querySnapshot) => {
      const firestorecommentlist = [];
      querySnapshot.forEach((doc) => {
        firestorecommentlist.push({
          id: doc.id,
          username: doc.data().username,
          creatorId: doc.data().creatorId,
        });
      });
      setCommentList(firestorecommentlist);
      // console.log(firestorecommentlist);
    });
  };
  useEffect(() => {
    getCreatorId();
  }, []);




  //! 여기서 민성 수정
  //! storage에 있는 모든 파일을 배열에 담아서 가져오기
  const getPhotoURL = async () => {
    const storageRef = ref(storage, 'images');
    const listRef = listAll(storageRef);
    listRef.then((res) => {
      res.items.forEach((itemRef) => {
        // console.log(itemRef);
        getDownloadURL(itemRef).then((url) => {
          // console.log(url);
          setPhotoURL(url);
        });
      });
    });
  };

  //! 다 내 사진이 뜸뜸
  // useEffect(() => {
  //   if (!currentUser) return;
  //   setPhotoURL(currentUser.photoURL);
  // }, [currentUser]);

  //! 나만 프로필 사진 뜨는 거
  useEffect(() => {
    // console.log(item);
    // console.log(currentUser);
    // console.log(item.creatorId);
    // console.log(currentUser.photoURL);
    // console.log(photoURL)

    if (currentUser.uid === item.creatorId) {
      setPhotoURL(currentUser.photoURL);
    } else {
      setPhotoURL('https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png');
      // https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a
    }
  }, [currentUser, item, photoURL]);

  //! 나만 프로필 사진 뜨는 거
  // useEffect(() => {
  //   console.log(item);
  //   console.log(currentUser);
  //   console.log(item.creatorId);
  //   console.log(currentUser.photoURL);
  //   console.log(photoURL)


  //   if (currentUser.uid === item.creatorId) {
  //     setPhotoURL(currentUser.photoURL);
  //   } else {
  //     setPhotoURL('');
  //   }
  // }, [currentUser, item, photoURL]);

  //! 수정중
  // useEffect(() => {
  //   setPhotoURL(photoURL);
  // }, [currentUser, photoURL, item]);

  //! 다 내 사진이 뜸
  // useEffect(() => {
  //   setPhotoURL(currentUser?.photoURL);
  // }, [currentUser, photoURL, item]);

  //! 다 내 사진이 뜸
  // useEffect(() => {
  //   if (currentUser.photoURL === item.creatorId) {
  //     setPhotoURL(currentUser?.photoURL);
  //   } else {
  //     setPhotoURL('https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a');
  //   }
  // }, [currentUser, item]);

  //! 아무도 안뜸뜸
  // useEffect(() => {
  //   if (currentUser.photoURL === item.creatorId) {
  //     setPhotoURL(currentUser.photoURL);
  //   } else {
  //     setPhotoURL('');
  //   }
  // }, [currentUser, item]);

  //! 여기까지 민성 수정

  const [profileUrl, setProfileUrl] = useState("");

  // const profileImgRef = ref(storage, '/profileImg/' + item.creatorId + '.png');
  // console.log(profileImgRef);

  // const imgUrl = getDownloadURL(
  //   ref(storage, profileImgRef))
  //   .then(url => setProfileUrl(url));

  // const splitDash = profileUrl?.split("/");
  // if ()
  // console.log(splitDash)
  // const splitDot = splitDash[7].split(".");
  // const userId = splitDot[0];
  // console.log(userId);


  return (
    <div style={{ marginTop: '50px' }}>
      <StCommentListContainer key={id}>
        {/* 작성자 정보 및 댓글 내용 */}
        <StCommentProfileImage src={photoURL} alt='' />
        <StCommentUserName>사용자 닉네임</StCommentUserName>
        <StCommentContentInput
          name='comment'
          readOnly={readOnly}
          defaultValue={comment}
          onChange={onChangeComment}
        />
        {/* 버튼 영역 - 수정 & 삭제 VS 완료 & 취소  */}
        {/* <span>{item.comment}</span> */}
        <StCommentContentSaveTime>{savetime}</StCommentContentSaveTime>

        {item.creatorId === currentUser.uid ? (
          modify ? (
            <>
              <StCommentContentsEditButton
                type='button'
                className='comment-edit-complete-btn'
                onClick={() => {
                  updateCompleteButtonHandler(id);
                }}
              >
                완료
              </StCommentContentsEditButton>
              <StCommentContentsDeleteButton
                onClick={() => {
                  editCancelButtonHandler(id);
                }}
              >
                취소
              </StCommentContentsDeleteButton>
            </>
          ) : (
            <>
              <StCommentContentsEditButton
                className='comment-edit-btn'
                onClick={() => {
                  updateCommentModify(id);
                }}
              >
                수정
              </StCommentContentsEditButton>
              <StCommentContentsDeleteButton
                onClick={() => {
                  deleteCommentButtonHandler(id);
                }}
              >
                삭제
              </StCommentContentsDeleteButton>
            </>
          )
        ) : null}
      </StCommentListContainer>
    </div>
  );
};

export default ShopGuideDetailsComment;
