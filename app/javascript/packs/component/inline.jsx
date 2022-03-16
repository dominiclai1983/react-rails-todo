import React, {useState, useEffect} from 'react'
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const InlineEdit = (props) => {

  const {todo, onUpdate, onDelete, onMarkCompleted, username} = props;

  const [item, setItem] = useState(todo.item);
  const [completed, setCompleted] = useState(todo.completed);

  const handleSubmitByEnter = (event) => {
    if(event.key === "Enter"){
      event.target.blur();
    }
  }

  /* div  */

  return (

    <div className="d-flex align-items-center">
      <InputGroup>
        <FormControl
          aria-label="todo"
          aria-describedby="basic-addon"
          id="render-list"
          value={item}
          onChange={(event) => {
            setItem(event.target.value);
            console.log(event.target.value);
          }}
          onBlur={(event)=> onUpdate(todo.id, event.target.value)}
          onKeyDown={handleSubmitByEnter}
        />
      </InputGroup>

      <Form>
        <Form.Check 
          type="switch"
          id={`custom-switch-${todo.id}`}
          label=" "
          checked={completed}
          onChange={event => {
            setCompleted(!completed);
            console.log(event.target.checked);
            onMarkCompleted(todo.id, event.target.checked);
          }}
          className="mx-2"
        />
      </Form>

      <div onClick={() => onDelete(todo.id)}>
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>

  );
};

export default InlineEdit;