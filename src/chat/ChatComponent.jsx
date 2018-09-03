import React, { Component } from 'react'
import Login from './components/Login';
import UserList from './components/UserList'
import Messages from './components/Messages'
import Input from './components/Input'
import SocketContext from '../socket-context';

class Chat extends Component {
  render() {
    if (this.props.authenticated) {
      return (
        <div>
          <UserList users={this.props.users} />
          <Messages username={this.props.username} messages={this.props.messages} />
          <Input commandBot={this.props.commandBot} socket={this.props.socket} />
        </div>
      )
    }
  
    return <Login socket={this.props.socket} /> 
  }

  componentDidMount() {
    this.props.socket.on('LOGIN_SUCCESS', (data) => {
      this.props.authenticate(data)
      this.props.commandBot('/greet')
    })
    this.props.socket.on('LOGIN_ERROR', (error) => alert(error))
    this.props.socket.on('USER_LOGIN', (user) => this.props.userLogin(user))
    this.props.socket.on('USER_LOGOUT', (username) => this.props.userLogout(username))
    this.props.socket.on('NEW_MESSAGE', (message) => this.props.newMessage(message))
  }
}

const ChatWithSocket = (props) => (
  <SocketContext.Consumer>
    { (socket) => <Chat {...props} socket={socket} /> }
  </SocketContext.Consumer>
)

export default ChatWithSocket