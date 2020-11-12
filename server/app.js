require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')
const app = express()
const http = require('http').createServer(app)
const port = process.env.PORT
const io = require('socket.io')(http)
const bcrypt = require('bcryptjs')

// Body Parser
app.use(cors())
app.use(express.json())
app.use(urlencoded({extended: true}))

io.on('connection', socket => {
  console.log('A user connected')
  let rooms = {}
  

  socket.on('createRoom', (result) => {
    let room = {}
    room.name = result.name
    // room.params = bcrypt.hashSync(result.name, bcrypt.genSaltSync(2)).split('.')[0]
    // console.log(bcrypt.hashSync(result.name, bcrypt.genSaltSync(2)))
    room.private = result.private
    room.players = []
    rooms[room.name] = room
    io.emit('roomCreated', room)
    console.log(room)
  })

  socket.on('fetchRooms', () => {
    console.log('tersuruh')
    io.emit('roomsFetched', rooms)
  })
})

http.listen(process.env.PORT, () => {
  console.log('listening on '+ port)
})