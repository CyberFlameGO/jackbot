import { combineReducers } from 'redux'
import blackjack from './blackjack'
import chat from './chat'

export default combineReducers({
  chat,
  blackjack
}) 