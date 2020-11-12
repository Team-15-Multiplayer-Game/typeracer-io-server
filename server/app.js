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

io.on('connection', socket => {
  console.log('A user connected')
})

http.listen(3000, () => {
  console.log('listening on '+ port)
})