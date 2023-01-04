import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Outlet = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  left: 0;
  top: 0;
  right: 0;
  /* width: 100vw; */
`;

export const StyledSaveDuckHome = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background-color: white;
`;

export const SaveDuckHomeNav = styled(NavLink)`
  /* color: black; */
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const MyProfileMoDal = styled.div`
  text-decoration: none;
  font-size: 15px;
  font-weight: 900;
  font-family: 'Comfortaa', cursive;
  /* text-shadow: -0.2px 0 #ffc226, 0 0.2px #ffc226, 0.2px 0 #ffc226,
    0 -0.2px #ffc226; */
  &:hover {
    text-shadow: -0.3px 0 #ff8a00, 0 0.3px #ff8a00, 0.3px 0 #ff8a00,
      0 -0.3px #ff8a00;
  }
`;

export const DuckImageLogo = styled.img`
  display: flex;
  align-items: center;
  width: 120px;
`;

export const LeftSection = styled.div`
  margin-left: 30px;
`;

export const RightSection = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
`;

export const Menu = styled.div`
  margin-right: 100px;
  display: flex;
`;

export const MenuItem = styled(NavLink)`
  text-decoration: none;
  margin-right: -60px;
  font-size: 15px;
  font-weight: 900;
  font-family: 'Comfortaa', cursive;
  /* text-shadow: -0.2px 0 #ffc226, 0 0.2px #ffc226, 0.2px 0 #ffc226,
    0 -0.2px #ffc226; */
  /* color: black; */
  &:hover {
    text-shadow: -0.3px 0 #ff8a00, 0 0.3px #ff8a00, 0.3px 0 #ff8a00,
      0 -0.3px #ff8a00;
  }
`;

export const NavProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
`;

export const SignUp = styled.div`
  display: flex;
  align-items: center;
`;
