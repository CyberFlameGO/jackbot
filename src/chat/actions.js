import * as JackBot from '../bots/JackBot'
import * as HelpBot from '../bots/HelpBot'

export function authenticate(data) {
  return { type: '@@chat/AUTHENTICATE', payload: data }
}

export function newMessage(message) {
  return { type: '@@chat/NEW_MESSAGE', payload: message }
}

export function userLogin(user) {
  return { type: '@@chat/USER_LOGIN', payload: user }
}

export function userLogout(user) {
  return { type: '@@chat/USER_LOGOUT', payload: user }
}

export function jackBotSays(message) {
  return { type: '@@chat/JACKBOT_SAYS', payload: message }
}

export function helpBotSays(message) {
  return { type: '@@chat/HELPBOT_SAYS', payload: message }
}

export function commandBot(command) {
  return (dispatch, getState) => {
    switch(command) {
      case '/greet':
        HelpBot.greet(dispatch, getState)
        break

      case '/help':
        HelpBot.help(dispatch, getState)
        break

      case '/p':
        JackBot.play(dispatch, getState)
        break

      case '/q':
        JackBot.quit(dispatch, getState)
        break

      case '/h':
        JackBot.hit(dispatch, getState)
        break 

      case '/s':
        JackBot.stand(dispatch, getState)
        break

      case '/y':
        JackBot.yes(dispatch, getState)
        break

      case '/n':
        JackBot.no(dispatch, getState)
        break

      default:
        break
    }
  }
}

export default {
  authenticate,
  newMessage,
  userLogin,
  userLogout,
  commandBot,
  helpBotSays,
  jackBotSays
}