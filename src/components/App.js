import React from 'react'
import { Button } from 'react-bootstrap'

import LOGIC from '../../config/logic.js'
window.LOGIC = LOGIC
import { Span } from './Span'
import { Form } from './Form'
import { NonSpan } from './NonSpan'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      url: "",
      formatted: false,
      highlightColor: 'yellow',
      jsx: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormat = this.handleFormat.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let newUrl = this.sanitizeUrl()
    fetch(`http://localhost:3000/?url=${newUrl}`)
    .then((resp) => {
      resp.json().then((data) => {
        let queryDiv = document.getElementById('query')
        if(data.query) {
          let jsx = this.makeJSX(data.query)
          this.setState({
            jsx: jsx
          })
        } else {
          queryDiv.innerHTML = `Server came back with ${data.error}`
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  sanitizeUrl() {
    if(this.state.url.substr(0, 4) !== 'http'){
      return `http://${this.state.url}`
    } else {
      return this.state.url
    }
  }

  makeJSX(jsx) {
    let jsxArr = []
    let nonSpan = ""
    jsx.replace(/<.*?>|./g, (match, p1) => {
      if(match[0] === '<' && (match[1] !== '!' || match[2] !== '-')) {
        if(nonSpan.length !== 0) {
          jsxArr.push(<NonSpan key={p1 - 1} string={nonSpan} />)
          nonSpan = ""
        }
        jsxArr.push(<Span key={p1} handleClick={this.handleClick} content={match} />)
      } else {
        nonSpan = nonSpan + match
      }
    })
    return jsxArr
  }

  handleChange(e) {
    this.setState({
      url: e.target.value
    })
  }

  handleClick(e) {
    LOGIC.unHighlight(this.state.formatted)
    if(e.target.tagName === "SPAN") {
      let highlighted = document.getElementsByClassName(e.target.className)
      Array.prototype.map.call(highlighted, (span) => {
        this.state.formatted ? span.style=`background-color:${this.state.highlightColor};display:block;` : span.style = `background-color:${this.state.highlightColor};`
      })
    }
  }

  handleColorChange(e) {
    this.setState({
      highlightColor: e
    })
  }

  handleFormat(e) {
    e.preventDefault()
    let spans = document.querySelectorAll('span')
    // Workaround to put on event cycle
    window.setTimeout(() => {
      Array.prototype.forEach.call(spans, (span) => {
        span.style = "display:block;"
      })
      this.setState({
        formatted: true
      })
    })
  }

  render() {
    return (
      <div onClick={this.handleClick} className="test" id="app">
        <Form handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              hasJSX={this.state.jsx.length > 0}
              handleFormat={this.handleFormat}
              handleColorChange={this.handleColorChange}/>
              {this.state.jsx}

      </div>
    )
  }
}

export default App
