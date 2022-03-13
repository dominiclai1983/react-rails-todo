import React from 'react'
import { InputGroup, Button, FormControl } from 'react-bootstrap';

const Input = () => {
  return (
    <>
      <InputGroup className="my-2">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon"
        />
        <Button variant="warning" id="button-addon">
          Add Task
        </Button>
      </InputGroup>
    </>
  )
}

export default Input;