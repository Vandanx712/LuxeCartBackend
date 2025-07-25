import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import SellerLogin from "../pages/Sellerlogin";
import CartModal from "../components/buyer/Cartmodel";
import AccountPage from "../components/buyer/Account";
import Wishlist from "../components/buyer/wishlist";
import Products from "../pages/Products";
import Product from "../components/common/Product";
import CategoryProducts from "../components/common/CategoryProducts";

const Page = () => {
  const PrivateRoute = ({ children }) => {
    const islogin = localStorage.getItem('id')
    return islogin ? children : <Navigate to='/' />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/sellerlogin' element={<SellerLogin />} />
        <Route path="/buyer/cart" element={<CartModal/>} />
        <Route path="/buyer/wishlist" element={<PrivateRoute><Wishlist/></PrivateRoute>}/>
        <Route path="/buyer" element={<PrivateRoute><AccountPage/></PrivateRoute>}/>
        <Route path="/" element={<Layout />} >
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products/>}/>
          <Route path="product/:id" element={<Product/>}/>
          <Route path="category/:pcid/:scid" element={<CategoryProducts/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
