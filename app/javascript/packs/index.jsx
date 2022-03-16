import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './component/layout';
import NavBar from './component/navbar';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './login';
import Signup from './signup';

import './index.scss';

export const Home = () => (
  <Layout>
    <h5 className="text-secondary">With An Account?</h5>
    <Link to='/login'>
      <button type="button" className="btn btn-warning btn-lg btn-block">Sign in </button>
    </Link>
    
    <h5 className="mt-2 text-secondary">Interested In?</h5>
    <Link to="/signup"> 
    <button type="button" className="btn btn-secondary btn-lg btn-block">Sign Up With Email</button>
    </Link>
  </Layout>
)

const Index = () => {

  return (
    <>
      <NavBar />
      <h1 className="text-center title-bar text-secondary"><span className="text-warning"><i class="fas fa-list"></i></span>{" <ToDo ... ... ... />"}</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Index;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index />,
    document.body.appendChild(document.createElement('div')),
  )
})
