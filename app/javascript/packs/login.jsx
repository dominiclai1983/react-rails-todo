import React, {useState} from 'react'
import Layout from './component/layout'

const Login = ({onLogin}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = {
    username,
    password
  }

  return (
    <>
      <Layout>
        <h3>Login To Your Account</h3>
          <form onSubmit={() => {onLogin(login)}}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail">Username</label>
              <input type="text" className="form-control" id="exampleUsername" placeholder="username" 
                onChange = {event => {
                  event.preventDefault();
                  setUsername(event.target.value);
              }}/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                onChange = {event => {
                  event.preventDefault();
                  setPassword(event.target.value);
                }} />
            </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </Layout>
    </>
  )
}

export default Login;