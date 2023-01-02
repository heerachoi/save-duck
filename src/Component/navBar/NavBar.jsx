import { Outlet, NavLink } from "react-router-dom";
import {
  StyledSaveDuckHome,
  LeftSection,
  SaveDuckHomeNav,
  DuckImageLogo,
  RightSection,
  Menu,
  MenuItem,
  SignUp,
} from "./NavBar";
import { useAuth, upload } from "../../firebase.js";
import Modal from "../modal/Modal.jsx";
import { useEffect, useState, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { current } from "@reduxjs/toolkit";

const Navbar = () => {
  const modalRef = useRef();
  const profileRef = useRef();
  const currentUser = useAuth();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    const modalCloseHandler = (e) => {
      if (
        modal === true &&
        modalRef.current.contains(e.target) === false &&
        profileRef.current.contains(e.target) === false
      )
        setModal(false);
    };
    window.addEventListener("click", modalCloseHandler);

    return () => {
      window.removeEventListener("click", modalCloseHandler);
    };
  }, [modal]);

  const handleSubmit = async (e) => {
    console.log(currentUser);
    e.preventDefault();
    try {
      await addDoc(collection(db, currentUser.uid), {
        id: currentUser.uid,
        nickName: "",
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Outlet />
      <StyledSaveDuckHome>
        {/* 왼쪽영역 */}
        <LeftSection>
          <SaveDuckHomeNav to="/">
            <span style={{ color: "#ffc226" }}>Save Duck</span>
            <DuckImageLogo src="ssave.png" alt="Home" />
          </SaveDuckHomeNav>
        </LeftSection>

        {/* 오른쪽영역 */}
        <RightSection>
          <Menu>
            <MenuItem style={{ color: "#ffc226" }} to="/signin">
              Features
            </MenuItem>
            <MenuItem style={{ color: "#ffc226" }} to="/shopguide">
              Community
            </MenuItem>
            <MenuItem style={{ color: "#ffc226" }} to="/shopguidedetails">
              Support
            </MenuItem>
          </Menu>

          <SignUp>
            <NavLink onClick={handleSubmit}>
              <img
                ref={profileRef}
                onClick={() => {
                  setModal(!modal);
                }}
                src="blankProfile.png"
              />
            </NavLink>
            {modal === true ? (
              <div ref={modalRef}>
                <Modal />
              </div>
            ) : null}
          </SignUp>
        </RightSection>
      </StyledSaveDuckHome>
    </>
  );
};

export default Navbar;
