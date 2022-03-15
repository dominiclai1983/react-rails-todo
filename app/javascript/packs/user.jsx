import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import LeftNav from './user/leftbar';
import Input from './user/input';
import NavBar from './component/navbar';
import InlineEdit from './component/inline';

import { Row, Col, Container, Form, CloseButton } from 'react-bootstrap';
import { safeCredentials, handleErrors } from './utils/fetchHelper';

import './user.scss';

export default function User(){

  const [todos, setTodo] = useState([]);
  const [username, setUsername] = useState("");
  const [authenticated, setAuth] = useState(false);

  const time = new Date();

  //check login method. if not login, the user will be redirect to front page
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

  const updateTodo = (id, msg) => {

    if(!id){
      return;
    }

    fetch(`api/tasks/${id}/update`, safeCredentials({
      method: 'PUT',
      body: JSON.stringify({
        item: msg
      })
    }))
    .then(handleErrors)
    .then(res => {
      console.log(res);
    })
  }

  const deleteTodo = (id) => {
    if(!id){
      return;
    }

    fetch(`api/tasks/${id}`, safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(res => {
      console.log(res);
    })

    loadAllToDo(username);

  }

  const handleTodoStatus = (id, completed, username) => {
    if(!completed){
    axios.put(`api/tasks/${id}/completed`)
      .then(response => {
        loadAllToDo(username);
      })
    }else {
      axios.put(`api/tasks/${id}/active`)
      .then(response => {
        loadAllToDo(username);
      })
    }
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
              <Col xs={2} md={3} className="mt-4 text-right">
                <LeftNav username={username} onLogOut={handLogOut} />
              </Col>
              <Col xs={10} md={9}>
                <div className="right-side border">
                  <Container>
                    <h3>Today is {time.toISOString().slice(0,10)}</h3>
                    <Row>
                      <Col xs={12}>
                        <Input username={username} onGetAllTodo={loadAllToDo} />
                      </Col>
                      <Col xs={12} className="border-bottom mt-1 mb-2 pb-2">
                      &emsp;<a href={null} className="kinda-link" onClick={loadAllToDo}>All</a>&emsp;|&emsp;<a href={null} className="kinda-link" onClick={loadActiveToDo}>Active</a>&emsp;|&emsp;<a href={null} className="kinda-link" onClick={loadCompletedToDo}>Completed</a>
                      </Col>
                      <Col xs={12}>
                      {todos.reverse().map(todo => {
                        return <InlineEdit key={todo.id} todo={todo} username={username} onUpdate={updateTodo} onDelete={deleteTodo} onMarkCompleted={handleTodoStatus} />
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
