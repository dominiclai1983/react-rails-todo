import React, {useState} from 'react'
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import axios from 'axios';

const Input = () =>{

  const [item, setItem] = useState('');
  
  const handleSubmit = () => {
    const todo = {item: item};

    axios.post('api/tasks', todo)
    .then(response => {
      console.log(response);
      console.log(response.data);
      setItem('');
    })
  }

  return (
    <>
      <InputGroup className="my-2">
        <FormControl
          placeholder="What is in your mind?"
          aria-label="todo"
          aria-describedby="basic-addon"
          value={item}
          onChange={event =>{
            event.preventDefault();
            setItem(event.target.value);
          }}
          onSubmit={handleSubmit}
        />
        <Button variant="warning" id="button-addon" onClick={handleSubmit}>
          Add Task
        </Button>
      </InputGroup>
    </>
  )
}

export default Input;