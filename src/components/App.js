import React from 'react'
import { Button } from 'react-bootstrap'

import LOGIC from '../../config/logic.js'
window.LOGIC = LOGIC
import { Span } from './Span'
import { Form } from './Form'

import style from '../style/style.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      url: "",
      html: "",
      formatted: false,
      highlightColor: 'yellow'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormat = this.handleFormat.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/?url=${this.state.url}`)
    .then((resp) => {
      resp.json().then((data) => {
        let queryDiv = document.getElementById('query')
        if(data.query) {
          this.setState({
            html: LOGIC.escapeHtml(data.query)
          })
          // let newShit = this.state.html.replace(/<.*?>/g, (match) => {
          //   return <Span handleClick={this.handleClick} content={this.content} />
          // })
          LOGIC.addClass()
        } else {
          queryDiv.innerHTML = `Server came back with ${data.error}`
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleChange(e) {
    this.setState({
      url: e.target.value
    })
  }

  handleClick(e) {
    LOGIC.unHighlight()
    if(e.target.tagName === "SPAN") {
      let highlighted = document.getElementsByClassName(e.target.className)
      Array.prototype.forEach.call(highlighted, (span) => {
        span.style = `background-color:${this.state.highlightColor}`
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
    this.setState({
      spans: document.querySelectorAll('span')
    })
    let leftMargin = 0
    let spans = document.querySelectorAll('span')
    Array.prototype.forEach.call(spans, (span) => {

    })
  }

  render() {
    return (
      <div onClick={this.handleClick} className="test" id="app">
        <Form handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              hasHTML={this.state.html.length > 0}
              handleFormat={this.handleFormat}
              handleColorChange={this.handleColorChange}/>
        {this.state.html.length > 0 ? <p id="query-text" dangerouslySetInnerHTML={{__html: this.state.html}}></p> : null}
      </div>
    )
  }
}

export default App
