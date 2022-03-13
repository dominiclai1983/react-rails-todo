import React from 'react'
import Button from 'react-bootstrap/Button';

const LeftNav = (props) => {

  const {username, onLogOut} = props;

  return (
    <>
      <h3>Wellcome!{` ${username}`}</h3>
      <h6 className="text-secondary"><i class="fas fa-chevron-right"></i> Your ToDo</h6>
      <h6 className="text-secondary">Your Account</h6>
      <Button variant="secondary" onClick={onLogOut}>LogOut</Button>
    </>
  )
}

export default LeftNav;