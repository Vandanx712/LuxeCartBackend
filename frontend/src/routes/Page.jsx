import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import SellerLogin from "../pages/Sellerlogin";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path='/sellerlogin' element={<SellerLogin/>}/>
        <Route path="/" element={<Layout/>} >
            <Route path="" element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
