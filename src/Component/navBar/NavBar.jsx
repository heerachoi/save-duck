import { NavLink } from 'react-router-dom';
import {
  StyledSaveDuckHome,
  LeftSection,
  SaveDuckHomeNav,
  DuckImageLogo,
  RightSection,
  Menu,
  MenuItem,
  SignUp,
} from './NavBar';
import Modal from '../modal/Modal.jsx';
import { useEffect, useState, useRef } from 'react';

const Navbar = () => {
  const modalRef = useRef();
  const profileRef = useRef();

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
    window.addEventListener('click', modalCloseHandler);

    return () => {
      window.removeEventListener('click', modalCloseHandler);
    };
  }, [modal]);

  return (
    <StyledSaveDuckHome>
      {/* 왼쪽영역 */}
      <LeftSection>
        <SaveDuckHomeNav to='/'>
          <span style={{ color: '#ffc226' }}>Save Duck</span>
          <DuckImageLogo src='ssave.png' alt='Home' />
        </SaveDuckHomeNav>
      </LeftSection>

      {/* 오른쪽영역 */}
      <RightSection>
        <Menu>
          <MenuItem style={{ color: '#ffc226' }} to='/signin'>
            Features
          </MenuItem>
          <MenuItem style={{ color: '#ffc226' }} to='/shopguide'>
            Community
          </MenuItem>
          <MenuItem style={{ color: '#ffc226' }} to='/shopguidedetails'>
            Support
          </MenuItem>
        </Menu>

        <SignUp>
          <NavLink>
            <img
              ref={profileRef}
              onClick={() => {
                setModal(!modal);
              }}
              src='blankProfile.png'
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
  );
};

export default Navbar;
