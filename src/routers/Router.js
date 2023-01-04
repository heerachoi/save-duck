import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../Component/navBar/NavBar.jsx';
import Home from '../pages/Home.jsx';
import ShopGuide from '../pages/ShopGuide.jsx';
import ShopGuideDetails from '../pages/ShopGuideDetails.jsx';
import SignIn from '../pages/SignIn.jsx';
import SignUp from '../pages/SignUp.jsx';
import ShopGuidePosting from '../pages/ShopGuidePosting.jsx';
import ShopGuideArticle from '../pages/ShopGuideArticle.jsx';

// import EditForm from '../Component/shopGuide/ShopGuidePostFormEdit';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path='/home' element={<Home />} />
          <Route path='/shopguide' element={<ShopGuide />} />
          <Route path='/shopguidearticle' element={<ShopGuideArticle />} />
          <Route path='/shopguidearticle/:id' element={<ShopGuideArticle />} />
          <Route path='/shopguideposting' element={<ShopGuidePosting />} />
          <Route
            path='/shopguidedetails/:id'
            component={ShopGuideDetails}
            element={<ShopGuideDetails />}
          />
        </Route>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
