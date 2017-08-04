// submit form and handle data return
const addSource = (url) => {
  fetch(`http://localhost:3000/?url=${url}`)
  .then((resp) => {
    resp.json().then((data) => {
      let queryDiv = document.getElementById('query')
      if(data.query) {
        queryDiv.innerHTML = escapeHtml(data.query)
        addClass()
      } else {
        queryDiv.innerHTML = `Server came back with ${data.error}`
      }
    })
  })
  .catch((err) => {
    debugger
    console.log(err)
  })
}

document.getElementById('query-form').addEventListener('submit', (e) => {
  e.preventDefault()
  let url = document.getElementById('url').value
  addSource(url)
})

// make HTML safe and add span tags around elements
const escapeHtml = (makeSafe) => {
    return makeSafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;")
         .replace(/&lt;/g, '<span>&lt;')
         .replace(/&gt;/g, '&gt;</span>')
}


// Add unique class to each span
const hasWhiteSpace = (string) => {
  return string.indexOf(' ') >= 0
}

const isClosingTag = (string) => {
  return string[1] === '/'
}

const isNote = (string) => {
  return string[1] === '!' && string[2] === '-'
}

const createClass = (spanClass, char) => {
  if(isClosingTag(spanClass)) {
    return spanClass.substr(spanClass.indexOf('<') + 2, spanClass.indexOf(char) - 2)
  } else {
    return spanClass.substr(spanClass.indexOf('<') + 1, spanClass.indexOf(char) - 1)
  }
}

const addClass = () => {
  let spans = document.querySelectorAll('span')
  Array.prototype.forEach.call(spans, (span) => {
    let spanClass = span.innerText
    if(!isNote(spanClass)) {
      if(hasWhiteSpace(spanClass)) {
        spanClass = createClass(spanClass, ' ')
      } else {
        spanClass = createClass(spanClass, '>')
      }
      span.onclick = highLightAllElements
      span.className = spanClass
    }

  })
}

// highlight clicked spans
function highLightAllElements() {
  unHighlight()
  let highlighted = document.getElementsByClassName(this.className)
  Array.prototype.forEach.call(highlighted, (span) => {
    span.style = 'background-color:yellow;'
  })
}

// unhighlight on new click
const unHighlight = () => {
  let spans = document.querySelectorAll('span')
  Array.prototype.forEach.call(spans, (span) => {
    span.style = ""
  })
}
