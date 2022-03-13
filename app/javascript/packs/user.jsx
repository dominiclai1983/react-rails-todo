import React from 'react'
import ReactDOM from 'react-dom';
import NavBar from './component/navbar';
import { safeCredentials, handleErrors } from './utils/fetchHelper';
import $ from 'jquery';

import './todo.scss';

function User(){
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-3">
            left side
          </div>
          <div className="col-9">

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
