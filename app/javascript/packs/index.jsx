import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Layout from './component/layout';
import NavBar from './component/navbar';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './login';
import $ from 'jquery';

import './index.scss';

export const Home = () => (
  <Layout>
    <h5>With An Account?</h5>
    <Link to='/login'>
      <button type="button" className="btn btn-primary btn-lg btn-block">Sign in </button>
    </Link>

    
    <h5 className='mt-2'>Interested In?</h5>
    <Link to="/signup"> 
    <button type="button" className="btn btn-secondary btn-lg btn-block">Sign Up With Email</button>
    </Link>
  </Layout>
)

function Index(){

  const handleLogin = (login) => {
    var request = {
      type: 'POST',
      url: 'api/sessions',
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data:{
        user: login
      },
      success: function (response) {
        console.log(response)
      },
      error: function (request, errorMsg) {
        console.log(request, errorMsg);
        console.log("error");
      }
    }
    $.ajax(request);
  }

  return (
    <>
      <NavBar />
      <h1 className="text-center">📝 Let React ToDO With Rails</h1>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {/*
            <Route path="/signup" element={<Signup />} />
                        */}


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
