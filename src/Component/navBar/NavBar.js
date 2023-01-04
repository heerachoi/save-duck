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
  padding: 10px 10px 10px 10px;
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
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
`;

export const DuckImageLogo = styled.img`
  display: flex;
  align-items: center;
`;

export const LeftSection = styled.div``;

export const RightSection = styled.div`
  display: flex;
`;

export const Menu = styled.div`
  margin-right: 100px;
  display: flex;
  align-items: center;
`;

export const MenuItem = styled(NavLink)`
  text-decoration: none;
  margin-right: 8px;
  color: black;
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
