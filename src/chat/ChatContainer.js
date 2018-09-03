import { connect } from 'react-redux'
import Chat from './ChatComponent'
import actions from './actions'

const mapStateToProps = (state) => {
  const { authenticated, username, users, messages, game } = state.chat

  return {
    authenticated,
    username,
    users,
    messages,
    game
  }
}

const mapDispatchToProps = (dispatch) => {
  const authenticate = (data) => dispatch(actions.authenticate(data))
  const newMessage = (message) => dispatch(actions.newMessage(message))
  const commandBot = (command) => dispatch(actions.commandBot(command))
  const userLogin = (user) => dispatch(actions.userLogin(user))
  const userLogout = (user) => dispatch(actions.userLogout(user))

  return {
    authenticate,
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