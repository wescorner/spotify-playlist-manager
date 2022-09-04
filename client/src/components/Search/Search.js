import React, {useState} from 'react';
import Button from "react-bootstrap/Button"
import "./Search.scss"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

export default function Search({onSearch}) {

  const [search, setSearch] = useState("")

  return (

    <InputGroup className="mb-3">
        <Form.Control
      id="inputPassword5"
      aria-describedby="passwordHelpBlock"
      value={search}
      onChange = {(e) => setSearch(e.target.value)}
      
    />
        <Button onClick={() => onSearch(search)} variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
    
   
   
  )

  

}
