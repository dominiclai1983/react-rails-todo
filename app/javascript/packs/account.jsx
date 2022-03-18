import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import LeftNavAccount from './component/leftbaraccount';

class Account extends Component{

  constructor(props){
    super(props);
    this.state={
      username: "",
      authenticated: false,
    }
  }

  componentDidMount(){
    this.checkLogin();
  }

  checkLogin = () => {

    fetch('api/authenticated')
    .then(checkStatus)
    .then(json)
    .then(data => {
      if(data.authenticated){
        this.setState({
          username: data.username,
          authenticated: data.authenticated
        }, () => {
          console.log(this.state.username);//ensure the username will be updated, as this states will be used immediately at other place
        })
      }else{
        document.location.href="/";
      }
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

  render(){

    return(
      <>
        <LeftNavAccount username={username} onLogOut={handLogOut} />


      </>
    )
  }
}

export default Account; 

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Account />,
    document.body.appendChild(document.createElement('div')),
  )
})
