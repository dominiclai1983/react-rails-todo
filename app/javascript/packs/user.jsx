import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import Input from './user/input';
import LeftNav from './user/leftnav';
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

  const loadAllToDo = (username) => {
    axios.get('api/users/${username}/tasks')
    .then(response => {
      setTodo(response.data);
      console.log(todo);
    })
  }

  const loadActiveToDo = (username) => {
    axios.get('api/users/${username}/active')
    .then(response => {
      setTodo(response.data);
      console.log(todo);
    })
  }

  const loadCompletedToDo = (username) => {
    axios.get('api/users/${username}/completed')
    .then(response => {
      setTodo(response.data);
      console.log(todo);
    })
  }

  const handLogOut = () => {
    axios.delete('api/sessions')
    .then(response =>{
      if(response.data.success){
        document.location.href="/";
      }
    })
  }

  useEffect(() => {
    checkLogin();
  },[]);

  useEffect(() => {
    loadAllToDo(username);
  },[username]);

   

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          {/*Lefthand side*/}
          <div className="col-3 mt-4 text-right">
            <LeftNav username={username} onLogOut={handLogOut} />
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
                  <Input />
                </div>
                <div className="col-12 border-bottom">
                &emsp;<a href={null} onClick={loadAllToDo}>All</a>&emsp;|&emsp;<a href={null} onClick={loadActiveToDo}>Active</a>&emsp;|&emsp;<a href={null} onClick={loadCompletedToDo}>Completed</a>
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
