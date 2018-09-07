import React, { Component } from 'react'
import Header from './components/Header'
import Login from './components/Login'
import UserList from './components/UserList'
import Messages from './components/Messages'
import Input from './components/Input'
import SocketContext from '../socket-context'
import Blackjack from '../blackjack/BlackjackContainer';
import './Chat.scss'

class Chat extends Component {
  render() {
    if (this.props.authenticated) {
      return (
        <main className="Chat">
          <Header menuOpen={this.props.menuOpen} toggleMenu={this.props.toggleMenu} />
          
          <aside>
            <UserList menuOpen={this.props.menuOpen} users={this.props.users} />
          </aside>

          <section className={!this.props.playing ? 'full' : null}>
            <Messages username={this.props.username} messages={this.props.messages} />
            <Input commandBot={this.props.commandBot} socket={this.props.socket} />
          </section>
          
          {this.props.playing && <aside className="game">
            <Blackjack /> 
          </aside> }
        </main>
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