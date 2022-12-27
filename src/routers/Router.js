import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../Component/navBar/NavBar.jsx';
import Home from '../pages/Home.jsx';
import ShopGuide from '../pages/ShopGuide.jsx';
import ShopGuideDetails from '../pages/ShopGuideDetails.jsx';
import SignIn from '../pages/SignIn.jsx';
import SignUp from '../pages/SignUp.jsx';
import ShopGuidePosting from '../pages/ShopGuidePosting.jsx';
import ShopGuideArticle from '../pages/ShopGuideArticle.jsx';
import ShopGuidePostFormEdit from '../Component/shopGuidePostFormEdit/ShopGuidePostFormEdit.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/shopguide' element={<ShopGuide />} />
        <Route path='/shopguidearticle' element={<ShopGuideArticle />} />
        <Route path='/shopguidearticle/:id' element={<ShopGuideArticle />} />
        <Route
          path='/shopguidedetails/:id'
          component={ShopGuideDetails}
          element={<ShopGuideDetails />}
        />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/shopguideposting' element={<ShopGuidePosting />} />
        <Route
          path='/shopguidepostingEdit/:id'
          element={<ShopGuidePostFormEdit />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
