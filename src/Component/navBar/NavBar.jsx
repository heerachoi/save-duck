import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/">Gome</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/shopguide">ShopGuide</NavLink>
      <NavLink to="/shopguidedetails">ShopGuideDetails</NavLink>
      <NavLink to="/signup">SignUp</NavLink>
    </div>
  );
};

export default Navbar;
