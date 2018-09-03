import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import Login from '../components/Login'
import ChatInput from '../components/ChatInput'
import Messages from '../components/Messages'
import UserList from '../components/UserList'
import Bot from '../jackbot/bot';
import './Chat.scss'

class Chat extends Component {
  constructor(props) {
    super(props)

    this.io = openSocket('http://0.0.0.0:3001')
    this.subscribe()
  }

  render() {
    const authenticated = this.props.chat.authenticated
    const users = this.props.chat.users
    const messages = this.props.chat.messages
    const username = this.props.chat.username

    return (
      <div className="Chat">
        { !authenticated && <Login login={this.login} /> }

        { authenticated && <div>
          <UserList users={users} />
          <Messages username={username} messages={messages} />
          <ChatInput submit={this.sendMessage} />
        </div> } 
      </div>
    )
  }

  login = (username) => {
    this.io.emit('LOGIN', username)
  }

  sendMessage = (message) => {
    this.io.emit('MESSAGE', message)
  }

  subscribe = () => {
    this.io.on('LOGIN_SUCCESS', (data) => {
      this.props.dispatch({
        type: '@@chat/AUTH',
        payload: data
      })

      this.bot = new Bot(this.props.chat.username, this.props.dispatch)
    })

    this.io.on('LOGIN_ERROR', (error) => {
      alert(error)
    })

    this.io.on('USER_LOGIN', (user) => {
      this.props.dispatch({
        type: '@@chat/USER_LOGIN',
        payload: user
      })
    })

    this.io.on('USER_LOGOUT', (username) => {
      this.props.dispatch({
        type: '@@chat/USER_LOGOUT',
        payload: username
      })
    })

    this.io.on('NEW_MESSAGE', (message) => {
      let isSelf = message.username === this.props.chat.username

      if (isSelf && message.text.charAt(0) === '/') {
        return this.bot.processCommand(message)
      }

      this.props.dispatch({
        type: '@@chat/NEW_MESSAGE',
        payload: message
      })

      if (isSelf) {
        this.bot.listen(message)
      }
    })
  }
}

export default Chat 