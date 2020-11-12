require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')
const app = express()
const http = require('http').createServer(app)
const port = process.env.PORT
const io = require('socket.io')(http)

// Body Parser
app.use(cors())
app.use(express.json())
app.use(urlencoded({extended: true}))

let users = []

io.on('connection', socket => {
  console.log('A user connected')
  socket.on('userLogin', (username) => {
    console.log(username, 'ini username server')
    users.push(username)
    
  })
})

http.listen(3000, () => {
  console.log('listening on '+ port)
})