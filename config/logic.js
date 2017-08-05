import React from 'react'

export default {
  unHighlight: (formatted) => {
    let spans = document.querySelectorAll('span')
    Array.prototype.forEach.call(spans, (span) => {
      formatted ? span.style = "background-color:white;display:block;" : span.style = "background-color:white;"
    })
  }

}
