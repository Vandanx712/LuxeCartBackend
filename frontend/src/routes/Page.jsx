import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import SellerLogin from "../pages/Sellerlogin";
import CartModal from "../components/buyer/Cartmodel";

const Page = () => {
  const PrivateRoute = ({ children }) => {
    const islogin = localStorage.getItem('username')
    return islogin ? children : <Navigate to='/' />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/sellerlogin' element={<SellerLogin />} />
        <Route path="/buyer/cart" element={<PrivateRoute><CartModal/></PrivateRoute>} />
        <Route path="/" element={<Layout />} >
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
