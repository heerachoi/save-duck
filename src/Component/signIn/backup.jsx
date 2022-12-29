// import { authService } from "../../firebase";
// import React, { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signOut, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

// const auth = getAuth();

// const Auth = ({}) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [newAccount, setNewAccount] = useState(true);
//   const [error, setError] = useState("");

//   const onChange = (event) => {
//     const {
//       target: { name, value },
//     } = event;
//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
//     }
//   };
//   const onSubmit = async (event) => {
//     event.preventDefault();
//     let data;
//     if (newAccount) {
//       createUserWithEmailAndPassword(authService, email, password)
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           console.log(user);

//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           console.log(errorMessage);
//           setError(errorMessage);
//           // ..
//         });
//     } else {
//       signInWithEmailAndPassword(authService, email, password)
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           console.log(user);
//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           console.log(errorMessage);
//           setError(errorMessage);
//         });
//     }
//   };
//   const toggleAccount = () => setNewAccount((prev) => !prev);
//   const onSocialClick = async (event) => {
//     const {
//       target: { name },
//     } = event;
//     let provider;
//     if (name === "google") {
//       provider = new GoogleAuthProvider();
//     } else if (name === "github") {
//       provider = new GithubAuthProvider();
//     }
//     const data = await signInWithPopup(authService, provider);
//     console.log(data);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           name="email"
//           type="text"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={onChange}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={onChange}
//         />
//         <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
//         {error}
//       </form>
//       <span onClick={toggleAccount}>
//         {newAccount ? "Sign in" : "Create Account"}
//       </span>
//       <div>
//         <button onClick={onSocialClick} name="google">
//           Continue with Google
//         </button>
//         <button onClick={onSocialClick} name="github">
//           Continue with Github
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Auth;
