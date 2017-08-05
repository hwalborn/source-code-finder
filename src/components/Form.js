import React from 'react'
import { FormGroup, FormControl, Button, DropdownButton, MenuItem } from 'react-bootstrap'

export const Form = ({ handleChange, handleSubmit, hasJSX, handleFormat, handleColorChange }) => {
  let inputStyle = {
    width: "50%",
    height: "1.75em",
    fontSize: "2.5em",
    display: "inline"
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl
          style={inputStyle}
          onChange={handleChange}
          id="query"
        />
        <Button type="submit" bsStyle="primary" bsSize="large">Get Source Code</Button>
        <DropdownButton noCaret id="dropdown" bsStyle="primary" onSelect={handleColorChange} bsSize="large" title="Pick Highlighter Color">
          <MenuItem eventKey='yellow'>Yellow</MenuItem>
          <MenuItem eventKey='orange'>Orange</MenuItem>
          <MenuItem eventKey='pink'>Pink</MenuItem>
          <MenuItem eventKey='green'>Green</MenuItem>
          <MenuItem eventKey='aqua'>Aqua</MenuItem>
        </DropdownButton>
        {hasJSX ? <Button id="format-button" bsStyle="primary" bsSize="large" onClick={handleFormat}>Format HTML</Button> : null}
      </FormGroup>
    </form>
  )
}
