import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './login';
import $ from 'jquery';

import './index.scss';

const NavBar = () => {

  //using useState to control the toogle button manual show or not after clicking
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="no-gutters ml-lg-5 top-icon"><i className="fas fa-vector-square fa-2x"></i></span>
        <a className="navbar-brand my-auto" href="https://dominiclai1983-portfolio.netlify.app/"> Dominic Lai Currency Converter</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topnavbar" aria-controls="topnavbar" aria-expanded={!isNavCollapsed ? true : false} onClick={handleNavCollapse} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="topnavbar">
          <div className="navbar-nav ml-auto my-auto">
            <a className="nav-item nav-link mx-lg-4 my-1 my-lg-0 text-dark" href="https://dominiclai1983-portfolio.netlify.app/">Home</a>
            <a className="nav-item nav-link mx-lg-4 my-1 my-lg-0 text-dark" href="https://dominiclai1983-portfolio.netlify.app/">About</a>
            <a className="nav-item nav-link mx-lg-4 my-1 my-lg-0 text-dark" href="https://dominiclai1983-portfolio.netlify.app/">Protfolio</a>
            <a className="nav-item nav-link btn btn-secondary text-white my-1 my-lg-0 px-2 mr-lg-4" id="top-button" href="mailto:dominiclai1983@gmail.com" role="button">Contact Me</a>
          </div>
        </div>
      </nav>
    </>
  );

}

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
