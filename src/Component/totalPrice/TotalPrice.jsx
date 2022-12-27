// import { db } from '../../firebase.js';
// import { collection, addDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
// import { useState, useEffect, useRef } from 'react';

// const TotalPrice = ({ dateToString }) => {
//   const calculateTotalPrice = (date) => {
//     const q = query(collection(db, dateToString), where('isChecked', '==', false));

//     getDocs(q).then((querySnapshop) => {
//       const firestoreShoppingItemList = [];
//       querySnapshop.forEach((doc) => {
//         firestoreShoppingItemList.push({
//           id: doc.id,
//           date: doc.data().date,
//           name: doc.data().name,
//           isChecked: doc.data().isChecked,
//           price: doc.data().price,
//           modify: doc.data().modify,
//         });
//       });
//       // console.log('firestoreShoppingItemList');
//       // console.log(firestoreShoppingItemList);
//       // setItemList(firestoreShoppingItemList);
//     });
//   };
//   useEffect(() => {
//     calculateTotalPrice();
//   }, [dateToString]);

//   return <div>안녕</div>;
// };

// export default TotalPrice;
