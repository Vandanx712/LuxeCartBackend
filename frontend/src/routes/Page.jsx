import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
            <Route path="" element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
