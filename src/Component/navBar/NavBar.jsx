import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/shopguide'>ShopGuide</NavLink>
      <NavLink to='/shopguidedetails'>ShopGuideDetails</NavLink>
      <NavLink to='/signup'>SignUp</NavLink>
      <NavLink to='/shopguideposting'>ShopGuidePosting</NavLink>
    </div>
  );
};

export default Navbar;
