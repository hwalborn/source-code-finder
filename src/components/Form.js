import React from 'react'
import { FormGroup, FormControl, Button, DropdownButton, MenuItem } from 'react-bootstrap'

import style from '../style/form.css'

export const Form = ({ handleChange, handleSubmit, hasHTML, handleFormat, handleColorChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl
          onChange={handleChange}
          id="query"
        />
        <Button type="submit" bsStyle="primary" bsSize="large">Get Source Code</Button>
        <DropdownButton bsStyle="primary" onSelect={handleColorChange} bsSize="large" title="Pick Highlighter Color">
          <MenuItem eventKey='yellow'>Yellow</MenuItem>
          <MenuItem eventKey='orange'>Orange</MenuItem>
          <MenuItem eventKey='pink'>Pink</MenuItem>
          <MenuItem eventKey='green'>Green</MenuItem>
          <MenuItem eventKey='aqua'>Aqua</MenuItem>
        </DropdownButton>
        {hasHTML ? <Button id="format-button" bsStyle="primary" bsSize="large" onClick={handleFormat}>Format HTML</Button> : null}
      </FormGroup>
    </form>
  )
}
