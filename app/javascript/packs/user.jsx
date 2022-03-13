import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import NavBar from './component/navbar';

import './user.scss';

export default function User(){

  const [todo, setTodo] = useState([]);
  const [username, setUsername] = useState("");
  const [authenticated, setAuth] = useState(null);

  const time = new Date();

  const checkLogin = () => {
    axios.get('api/authenticated')
    .then(response => {
      console.log(response.data.authenticated);
      setUsername(response.data.username);
      setAuth(response.data.authenticated);
      /*
      if(!response.data.authenticated){
        window.location.href = "/";
      }
      */
    });
  }

  const loadToDo = (username) => {
    axios.get('api/users/${username}/tasks')
    .then(response => {
      setTodo(response.data);
      console.log(todo);
    })
  }

  useEffect(() => {
    checkLogin();
  },[]);

  useEffect(() => {
    loadToDo(username);
  },[username]);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          {/*Lefthand side*/}
          <div className="col-3 mt-4 text-right">
            Wellcome!
            {` ${username}`}
            <p>Your To Do</p>
            <p>Your Account</p>
            <p>Button Login At the btm</p>
          </div>


          <div className="col-9">
          <div className="right-side border">


          {/* place holder */}
            <div className="container">
            <div className="d-flex">
            <h3>Welcome!</h3><h3 className="right">{time.toISOString().slice(0,10)}</h3>
            </div>
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
