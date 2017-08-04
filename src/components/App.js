import React from 'react'

import LOGIC from '../../config/logic.js'
window.LOGIC = LOGIC

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      url: "",
      html: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
  render() {
    return (
      <div id="app">
        <form method="#" id="query-form" onSubmit={this.handleSubmit}>
          <input style={{width: "50%"}} type="text" id="url" name="query-url" onChange={this.handleChange} placeholder="http://www.example.com"></input>
          <input type="submit" value="Show Source"></input>
        </form>
        {this.state.html.length > 0 ? <div dangerouslySetInnerHTML={{__html: this.state.html}}></div> : null}
      </div>
    )
  }
}

export default App
