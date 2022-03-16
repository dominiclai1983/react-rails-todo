import React, {useEffect, useState, Component} from 'react'
import ReactDOM from 'react-dom';
import LeftNav from './user/leftbar';
import Input from './user/input';
import NavBar from './component/navbar';
import InlineEdit from './component/inline';

import { Row, Col, Container} from 'react-bootstrap';
import { safeCredentials, handleErrors, checkStatus, json } from './utils/fetchHelper';

import './user.scss';


class User extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      todos: [],
      username: "",
      authenticated: false
    }

    this.loadAllToDo = this.loadAllToDo.bind(this);
    this.loadActiveToDo = this.loadActiveToDo.bind(this);
    this.loadCompletedToDo = this.loadCompletedToDo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleTodoStatus = this.handleTodoStatus.bind(this);

  }

  componentDidMount(){

    this.checkLogin();

    this.loadAllToDo(this.username);

  }


  //check login method. if not login, the user will be redirect to front page
  checkLogin(){

      fetch('api/authenticated')
      .then(checkStatus)
      .then(json)
      .then(data => {
        if(data.authenticated){
          this.setState({
            username: data.username,
            authenticated: data.authenticated
          }, () => {
            console.log(this.state.username);
          })
        }else{
          document.location.href="/";
        }
      })
      .catch(error => {
        console.log(error);
      });

  }
  
  //load all todo method
  loadAllToDo(username){


    fetch(`api/users/${username}/tasks`)
    .then(checkStatus)
    .then(json)
    .then(data => {
      this.setState({
        todos: data.tasks
      })
    })
    .catch(error => {
      console.log(error);
    });

  }

  //load all todo that is with status active 
  loadActiveToDo(username){

    console.log(username);

    fetch(`api/users/${username}/active`)
    .then(checkStatus)
    .then(json)
    .then(data => {
      this.setState({
        todos: data.tasks
      })
      console.log(data.tasks);
    })


  }

  //load all todo that is with status completed 
  loadCompletedToDo = (username) => {

    fetch(`api/users/${username}/completed`)
    .then(checkStatus)
    .then(json)
    .then(data => {
      this.setState({
        todos: data.tasks
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  handLogOut = () => {

    fetch('api/sessions', safeCredentials({
      method: 'DELETE'
    }))
    .then(handleErrors)
    .then(data =>{
      if(data.success){
        document.location.href="/";
      }
    })

  }

  updateTodo = (id, msg) => {

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

  deleteTodo = (id) => {
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

    this.loadAllToDo(username);

  }

  handleTodoStatus = (id, completed) => {
    if(completed){

      fetch(`api/tasks/${id}/completed`, safeCredentials({
        method: 'PUT'
      }))
      .then(handleErrors)
      .then(res => {
        console.log(res);
      })

    }else {


      fetch(`api/tasks/${id}/active`, safeCredentials({
        method: 'PUT'
      }))
      .then(handleErrors)
      .then(res => {
        console.log(res);
      })
    }
  }

  render(){

    const time = new Date();

    const {authenticated, username, todos} = this.state;
   
    return (
      <>
        <div className={authenticated? null : "d-none"}>
          
          <NavBar />
            <Container>
              <Row>
                <Col xs={2} md={3} className="mt-4 text-right">
                  <LeftNav username={username} onLogOut={this.handLogOut} />
                </Col>
                <Col xs={10} md={9}>
                  <div className="right-side border">
                    <Container>
                      <h3 className="pt-2 trash-can">Today is {time.toLocaleDateString('en-US')}</h3>
                      <Row>
                        <Col xs={12}>
                          <Input username={username} onGetAllTodo={this.loadAllToDo} />
                        </Col>
                        <Col xs={12} className="border-bottom mt-1 mb-1 pb-2">
                        &emsp;<a href={null} className="kinda-link" onClick={() => {this.loadAllToDo(username)}}>All</a>&emsp;|&emsp;<a href={null} className="kinda-link" onClick={() => {this.loadActiveToDo(username)}} >Active</a>&emsp;|&emsp;<a href={null} className="kinda-link" onClick={() => {this.loadCompletedToDo(username)}} >Completed</a>
                        </Col>
                        <Col xs={12}>
                        {todos.reverse().map(todo => {
                          return <InlineEdit key={todo.id} todo={todo} onUpdate={this.updateTodo} onDelete={this.deleteTodo} onMarkCompleted={this.handleTodoStatus} />
                        })}
                        {(todos.length === 0 )? <h5 className="text-secondary">Let's Add Some Todo!</h5> : null}
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
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <User />,
    document.body.appendChild(document.createElement('div')),
  )
})
