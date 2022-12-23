import { NavLink } from "react-router-dom";
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
import Modal from "../modal/Modal.jsx";
import { useState } from "react";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  return (
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
          <MenuItem style={{ color: "#ffc226" }} to="/login">
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
          <NavLink to="/signup">
            <img
              onClick={() => {
                setModal(!modal);
              }}
              src="blankProfile.png"
            />
            {modal === true ? <Modal></Modal> : null}
          </NavLink>
        </SignUp>
      </RightSection>
    </StyledSaveDuckHome>
  );
};

export default Navbar;
