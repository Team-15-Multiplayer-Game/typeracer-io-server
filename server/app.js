require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')
const app = express()
const http = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(http)
const bcrypt = require('bcryptjs')

// Body Parser
app.use(cors())
app.use(express.json())
app.use(urlencoded({extended: true}))

let users = []
let rooms = []

io.on('connection', socket => {
  console.log('A user connected')
  socket.on('userLogin', (username) => {
    users.push(username)
    socket.emit('fetchRooms', rooms)
  })

  socket.on('mouse_draw', (data) => {
    socket.broadcast.emit('mouse_draw', data)
  })

  socket.on('erase_draw', (key) => {
    socket.broadcast.emit('erase_draw', key)
  })
  let rooms = {}
  

  socket.on('createRoom', (result) => {
    let room = {}
    room.name = result.name
    // room.params = bcrypt.hashSync(result.name, bcrypt.genSaltSync(2)).split('.')[0]
    // console.log(bcrypt.hashSync(result.name, bcrypt.genSaltSync(2)))
    room.private = result.private
    room.players = []
    console.log(room)
    rooms.push(room)
    io.emit('roomCreated', rooms)
    io.emit('userLogin', users)
  })

  socket.on('fetchRooms', () => {
    io.emit('fetchRooms', rooms)
  })
})

http.listen(port, () => {
  console.log('listening on '+ port)
})