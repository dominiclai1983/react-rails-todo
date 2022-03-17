import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';

const LeftNav = (props) => {

  const {username, onLogOut} = props;

  const [accountMode, setAccountMode] = useState(true);

  return (
    <>
      <h3>Wellcome!<span className='text-secondary'>{` ${username}`}</span></h3>
      <h6 className="text-secondary" onClick={() => setAccountMode(true)}><i className={accountMode? "fas fa-chevron-right text-warning" : null }></i> Your ToDo</h6>
      <h6 className="text-secondary">Your Account</h6>
      <Button variant="secondary" onClick={onLogOut}>LogOut</Button>
    </>
  )

}

export default LeftNav;