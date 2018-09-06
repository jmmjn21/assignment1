
const http = require('http')
const config = require('./config.js')
const utils = require('./helpers/utils.js')
const router = require('./routers/router.js')

const server = http.createServer((req, res) =>{
  middleware(req, res)
})

server.listen(config.port, () =>{
  console.log(`<<< Server is listening in >>> ${config.port}`)
})


const middleware = function (req, res) {
  let reqObject
  let body

  req.on('data', (data) =>{
    body = data
  })

  req.on('end', () =>{
    reqObject = utils.getRequestObject(req, body)
    const chosenHandler = typeof(router[reqObject.path]) !== 'undefined' ? router[reqObject.path] : router['hello']
    chosenHandler(reqObject, (statusCode, response) =>{
      statusCode = typeof(statusCode) === 'number' ? statusCode : 400
      response = typeof(response) === 'object' ? response : {}
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(JSON.stringify(response))
    })
  })
}
