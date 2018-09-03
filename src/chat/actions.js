import * as JackBot from './jackbot'

function authenticate(data) {
  return { type: '@@chat/AUTHENTICATE', payload: data }
}

function newMessage(message) {
  return { type: '@@chat/NEW_MESSAGE', payload: message }
}

function userLogin(user) {
  return { type: '@@chat/USER_LOGIN', payload: user }
}

function userLogout(user) {
  return { type: '@@chat/USER_LOGOUT', payload: user }
}

function commandBot(command) {
  return (dispatch, getState) => {
    const { chat } = getState()
    const username = chat.username

    switch(command) {
      case '/jackbot':
        var response = JackBot.hello(username)
        return dispatch(botSays(response))

      case '/help':
        response = JackBot.help(username)
        return dispatch(botSays(response))

      case '/blackjack':
        if (!chat.game.playing) {
          response = JackBot.startGame(username)
          dispatch(startGame(JackBot.generateDeck()))
          dispatch(hitDealer())
          dispatch(hitDealer())
          dispatch(hitPlayer())
          dispatch(hitPlayer())
          return dispatch(botSays(response))
        } else {
          response = JackBot.alreadyPlaying(username)
          return dispatch(botSays(response))
        }

      case '/quit':
        if (!chat.game.playing) {
          response = JackBot.notPlaying(username)
          dispatch(botSays(response))
          break
        } else {
          response = JackBot.quitGame(username)
          dispatch(quitGame())
          dispatch(botSays(response))
          break
        }

      case '/hit':
        if (chat.game.playing) {
          dispatch(hitPlayer())

          if (chat.game.dealer.score <= 17) {
            dispatch(hitDealer())
          }
        }
        break

      case '/hold':
        if (chat.game.playing) {
          if (chat.game.dealer.score < 17) {
            dispatch(hitDealer())
          }
        }
        break

      default:
        return
    }
  }
}

function botSays(message) {
  return { type: '@@chat/BOT_SAYS', payload: message }
}

function startGame(deck) {
  return { type: '@@chat/START_GAME', payload: deck }
}

function quitGame() {
  return { type: '@@chat/QUIT_GAME' }
}

function hitDealer() {
  return { type: '@@chat/HIT_DEALER' }
}

function hitPlayer() {
  return { type: '@@chat/HIT_PLAYER' }
}

export default {
  authenticate,
  newMessage,
  userLogin,
  userLogout,
  botSays,
  commandBot,
  startGame,
  quitGame,
  hitDealer,
  hitPlayer
}