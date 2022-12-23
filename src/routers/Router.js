import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from '../Component/navBar/NavBar.jsx';
import Home from '../pages/Home.jsx';
import ShopGuide from '../pages/ShopGuide.jsx';
import ShopGuideDetails from '../pages/ShopGuideDetails.jsx';
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/shopguide" element={<ShopGuide />} />
        <Route path="/shopguidedetails" element={<ShopGuideDetails />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
