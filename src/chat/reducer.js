import _ from 'lodash'

const initialState = {
  authenticated: false,
  username: '',
  users: [],
  messages: [],
  game: {
    playing: false,
    deck: [],
    dealer: {
      hand: [],
      score: 0
    },
    player: {
      hand: [],
      score: 0
    }
  }
}

export default function chat(state = initialState, action) {
  switch (action.type) {
    case '@@chat/AUTHENTICATE':
      return {
        ...state,
        authenticated: true,
        username: action.payload.username,
        users: action.payload.users
      }
      
    case '@@chat/USER_LOGIN':
      return {
        ...state,
        users: [...state.users, action.payload],
        messages: [...state.messages, {
          text: `${action.payload.username} has logged in.`,
          timestamp: Date.now()
        }]
      }

    case '@@chat/USER_LOGOUT':
      return {
        ...state,
        users: _.reject(state.users, { username: action.payload }),
        messages: [...state.messages, {
          text: `${action.payload} has logged out.`,
          timestamp: Date.now()
        }]
      }
      
    case '@@chat/NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }

    case '@@chat/BOT_SAYS':
      return {
        ...state,
        messages: [...state.messages, {
          username: 'JackBot',
          text: action.payload,
          timestamp: Date.now()
        }]
      }

    case '@@chat/START_GAME':
      return {
        ...state,
        game: {
          ...state.game,
          playing: true,
          deck: action.payload
        }
      }

    case '@@chat/QUIT_GAME':
      return {
        ...state,
        game: initialState.game
      }

    case '@@chat/HIT_DEALER':
      var card = state.game.deck[0]
      var hand = [...state.game.dealer.hand, card]

      return {
        ...state,
        game: {
          ...state.game,
          deck: _.reject(state.game.deck, card),
          dealer: {
            hand,
            score: hand.reduce((total, card) => total + card.value, 0)
          }
        }
      }

    case '@@chat/HIT_PLAYER':
      card = state.game.deck[0]
      hand = [...state.game.player.hand, card]

      return {
        ...state,
        game: {
          ...state.game,
          deck: _.reject(state.game.deck, card),
          player: {
            hand,
            score: hand.reduce((total, card) => total + card.value, 0)
          }
        }
      }

    default:
      return state
  }
}