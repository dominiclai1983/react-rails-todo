import React from 'react'
import ReactDOM from 'react-dom';
import NavBar from './component/navbar';
import $ from 'jquery';

import './todo.scss';

export const Todo = () => {
  return (
    <>
      <NavBar />
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
    </>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Todo />,
    document.body.appendChild(document.createElement('div')),
  )
})
