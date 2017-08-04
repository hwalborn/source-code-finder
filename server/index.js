const express = require('express');
const app = express()
const port = 3000
const axios = require('axios');

app.use((request, response, next) => {
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.get('/', (request, response) => {
  axios.get(request.query.url)
  .then((resp) => {
    response.json({
      query: resp.data
    })
  })
  .catch((err) => {
    response.json({
      error: err.code
    })
  })
})

app.listen(port, (err) => {
  if (err) {
    return console.log("couldn't create server", err)
  }

  console.log(`server is listening on ${port}`)
})
