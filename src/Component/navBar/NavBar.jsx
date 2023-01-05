import { Outlet, NavLink } from 'react-router-dom';
import { StyledSaveDuckHome, LeftSection, SaveDuckHomeNav, DuckImageLogo, RightSection, Menu, MenuItem, SignUp, MyProfileMoDal } from './NavBar';
import { useAuth, upload } from '../../firebase.js';
import Modal from '../modal/Modal.jsx';
import { useEffect, useState, useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { current } from '@reduxjs/toolkit';

const Navbar = () => {
  const modalRef = useRef();
  const profileRef = useRef();
  const currentUser = useAuth();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    const modalCloseHandler = (e) => {
      if (modal === true && modalRef.current.contains(e.target) === false && profileRef.current.contains(e.target) === false) setModal(false);
    };
    window.addEventListener('click', modalCloseHandler);

    return () => {
      window.removeEventListener('click', modalCloseHandler);
    };
  }, [modal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, currentUser.uid), {
        id: currentUser.uid,
        nickName: '',
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <Outlet />
      <StyledSaveDuckHome>
        {/* 왼쪽영역 */}
        <LeftSection>
          <SaveDuckHomeNav to='/home'>
            {/* <span style={{ color: '#ffc226' }}>Save Duck</span> */}
            <DuckImageLogo src='save_duck_logo_h.png' alt='Home' />
          </SaveDuckHomeNav>
        </LeftSection>

        {/* 오른쪽영역 */}
        <RightSection>
          <Menu>
            <MenuItem style={{ color: '#ffc226' }} to='/shopguide'>
              Community
            </MenuItem>
          </Menu>
          <SignUp>
            <NavLink style={{ color: '#ffc226', textDecoration: 'none' }} onClick={handleSubmit}>
              <MyProfileMoDal
                className='myProfileMoDal'
                ref={profileRef}
                onClick={() => {
                  setModal(!modal);
                }}
              >
                My Profile
              </MyProfileMoDal>
            </NavLink>
            {modal === true ? (
              <div ref={modalRef}>
                <Modal />
              </div>
            ) : null}
          </SignUp>
        </RightSection>
      </StyledSaveDuckHome>
    </div>
  );
};

export default Navbar;
