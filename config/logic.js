import React from 'react'

export default {
  escapeHtml: (makeSafe) => {
      return makeSafe
           .replace(/&/g, "&amp;")
           .replace(/</g, "&lt;")
           .replace(/>/g, "&gt;")
           .replace(/"/g, "&quot;")
           .replace(/'/g, "&#039;")
           .replace(/&lt;/g, '<span>&lt;')
           .replace(/&gt;/g, '&gt;</span>')
  },

  isNote: (string) => {
    return string[1] === '!' && string[2] === '-'
  },

  hasWhiteSpace: (string) => {
    return string.indexOf(' ') >= 0
  },

  isClosingTag: (string) => {
    return string[1] === '/'
  },

  createClass: (spanClass, char) => {
    if(LOGIC.isClosingTag(spanClass)) {
      return spanClass.substr(spanClass.indexOf('<') + 2, spanClass.indexOf(char) - 2)
    } else {
      return spanClass.substr(spanClass.indexOf('<') + 1, spanClass.indexOf(char) - 1)
    }
  },

  addClass: () => {
    let spans = document.querySelectorAll('span')
    Array.prototype.forEach.call(spans, function(span) {
      let spanClass = span.innerText
      if(!LOGIC.isNote(spanClass)) {
        if(LOGIC.hasWhiteSpace(spanClass)) {
          spanClass = LOGIC.createClass(spanClass, ' ')
        } else {
          spanClass = LOGIC.createClass(spanClass, '>')
        }
        span.className = spanClass
      }
    })
  },

  unHighlight: () => {
    let spans = document.querySelectorAll('span')
    Array.prototype.forEach.call(spans, (span) => {
      span.style = "background-color:white;"
    })
  }

}
