import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledSaveDuckHome = styled.div`
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
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

export const SignUp = styled.div`
  display: flex;
  align-items: center;
`;
