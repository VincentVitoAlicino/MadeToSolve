const http = require('http')
const server = http.createServer((request, response) => {
    response.rawListeners('Hello World')
    response.end()
})
server.listen(3000) 