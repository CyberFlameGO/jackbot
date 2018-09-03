const io = require('socket.io')()
const _ = require('lodash')

let users = [{
  username: 'JackBot',
  status: 'online',
  timestamp: Date.now(),
  type: 'bot'
}], messages = []

io.on('connection', (socket) => {
  socket.on('LOGIN', (username) => {
    if (username.length === 0) {
      return socket.emit('LOGIN_ERROR', 'Username is required.')
    }
    
    if (users.some((user) => user.username === username)) {
      return socket.emit('LOGIN_ERROR', 'Username is already in use.')
    } 
    
    const user = {
      username,
      timestamp: Date.now(),
      status: 'online',
      type: 'user'
    }
    
    users.push(user)

    socket.username = username
    socket.emit('LOGIN_SUCCESS', { users, username })
    socket.broadcast.emit('USER_LOGIN', user)
  })  

  socket.on('disconnect', () => {
    if (socket.username) {
      users = _.reject(users, { username: socket.username })
      socket.broadcast.emit('USER_LOGOUT', socket.username)
    }
  })

  socket.on('MESSAGE', (message) => {
    if (message.length === 0) {
      return
    }
    
    const userMessage = {
      username: socket.username,
      text: message,
      timestamp: Date.now()
    }

    messages.push(userMessage)
    socket.emit('NEW_MESSAGE', userMessage)
    socket.broadcast.emit('NEW_MESSAGE', userMessage)
  })
})  

io.listen(3333)