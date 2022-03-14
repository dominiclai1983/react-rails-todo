import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import LeftNav from './user/leftbar';
import Input from './user/input';
import NavBar from './component/navbar';
import InlineEdit from './component/inline';
import {Row, Col, Container, Form, CloseButton} from 'react-bootstrap';

import './user.scss';

export default function User(){

  const [todos, setTodo] = useState([]);
  const [username, setUsername] = useState("");
  const [authenticated, setAuth] = useState(false);

  const time = new Date();

  const checkLogin = () => {
    axios.get('api/authenticated')
    .then(response => {
      console.log(response.data.authenticated);
      setUsername(response.data.username);
      setAuth(response.data.authenticated);
      
      if(!response.data.authenticated){
        window.location.href = "/";
      }
      
    });
  }

  const loadAllToDo = (username) => {
    axios.get('api/users/${username}/tasks')
    .then(response => {
      setTodo(response.data.tasks);
      console.log(todos);
      console.log(response.data.tasks)
    })
  }

  const loadActiveToDo = (username) => {
    axios.get('api/users/${username}/active')
    .then(response => {
      setTodo(response.data.tasks);
      console.log(todos);
    })
  }

  const loadCompletedToDo = (username) => {
    axios.get('api/users/${username}/completed')
    .then(response => {
      setTodo(response.data.tasks);
      console.log(todos);
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
      <div className={authenticated? null : "d-none"}>
        
        <NavBar />
        <Container>
          <Row>
            <Col xs={3} className="mt-4 text-right">
              <LeftNav username={username} onLogOut={handLogOut} />
            </Col>
            <Col xs={9}>
              <div className="right-side border">
                <Container>
                  <h3>Today is {time.toISOString().slice(0,10)}</h3>
                  <Row>
                    <Col xs={12}>
                      <Input />
                    </Col>
                    <Col xs={12} className="border-bottom">
                    &emsp;<a href={null} className="kinda-link" onClick={loadAllToDo}>All</a>&emsp;|&emsp;<a href={null} className="kinda-link" onClick={loadActiveToDo}>Active</a>&emsp;|&emsp;<a href={null} className="kinda-link" onClick={loadCompletedToDo}>Completed</a>
                    </Col>
                    <Col xs={12}>

                      {todos.map(todo => {
                        return (
                          <div className="d-flex align-items-center my-2" key={todo.id}>
                            <InlineEdit item={todo.item} />
                            <Form>  
                            <Form.Check 
                              type="switch"
                              id="custom-switch"
                              checked={todo.completed}
                            /></Form>
                            <CloseButton />
                          </div>)
                      })}

                    </Col>
                  </Row>
                </Container>  
              </div>
            </Col>
          </Row>
        </Container>

      </div>
    </>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <User />,
    document.body.appendChild(document.createElement('div')),
  )
})
