import React, {useState} from 'react'

const InlineEdit = (props) => {

  const {item} = props;

  const [editingValue, setEditingValue] = useState(item);

  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === "") {
      setEditingValue(item);
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <input 
      className="listing"
      type="text"
      aria-label="to-do"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};

export default InlineEdit;