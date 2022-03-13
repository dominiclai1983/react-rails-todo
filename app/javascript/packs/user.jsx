import React, {useEffect, useState} from 'react'
import axios from 'axios';
import ReactDOM from 'react-dom';
import NavBar from './component/navbar';
import {json, checkStatus, handleErrors, safeCredentials} from './utils/fetchHelper';
import $ from 'jquery';

import './user.scss';

export default function User(){

  let [todo, setTodo] = useState([]);
  let [username, setUsername] = useState("");
  let [authenticated, setAuth] = useState(null);

  const checkLogin = () => {
    axios.get('api/authenticated')
    .then(response => {
      setUsername(response.data.username);
      setAuth(response.data.authenticated);
    });
  }

  

  useEffect(() => {
    checkLogin();
  },[]);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-3">
            Wellcome!
            {` ${username}`}
          </div>
          <div className="col-9">

          <h3>Welcome!</h3>

          {/* place holder */}
            <div className="container">
              <div className="row">
                <div className="col-12">
                  Input Field
                </div>
                <div className="col-12">
                  All / Active / Completed
                </div>
                <div className="col-12">
                  ToDo List
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      {/* 
      <h3>Welcome!</h3>
      <div className="container">
        <div className="row">
          <div className="col-12">
            Input Field
          </div>
          <div className="col-12">
            All / Active / Completed
          </div>
          <div className="col-12">
            ToDo List
          </div>
        </div>
      </div>
      */}

    </>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <User />,
    document.body.appendChild(document.createElement('div')),
  )
})
