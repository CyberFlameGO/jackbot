import { connect } from 'react-redux'
import Chat from './ChatComponent'
import actions from './actions'

const mapStateToProps = (state) => {
  const {
    authenticated, 
    menuOpen, 
    username, 
    users, 
    messages, 
    game
  } = state.chat

  const {
    playing
  } = state.blackjack

  return {
    authenticated,
    menuOpen,
    username,
    users,
    messages,
    game,
    playing
  }
}

const mapDispatchToProps = (dispatch) => {
  const authenticate = (data) => dispatch(actions.authenticate(data))
  const toggleMenu = () => dispatch(actions.toggleMenu())
  const newMessage = (message) => dispatch(actions.newMessage(message))
  const commandBot = (command) => dispatch(actions.commandBot(command))
  const userLogin = (user) => dispatch(actions.userLogin(user))
  const userLogout = (user) => dispatch(actions.userLogout(user))

  return {
    authenticate,
    toggleMenu,
    newMessage,
    commandBot,
    userLogin,
    userLogout
  }
}

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)

export default ChatContainer