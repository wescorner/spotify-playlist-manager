import React from 'react';
import "./Search.scss"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

export default function Search({onSearch}) {

  return (

    <InputGroup className="mb-3">
        <Form.Control
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      onChange = {(e) => onSearch(e.target.value)}

    />
      </InputGroup>
    
   
   
  )

  

}
