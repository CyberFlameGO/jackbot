import _ from 'lodash'

const initialState = {
  authenticated: false,
  username: '',
  users: [],
  messages: []
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

    case '@@chat/HELPBOT_SAYS':
      return {
        ...state,
        messages: [...state.messages, {
          username: 'HelpBot',
          text: action.payload,
          timestamp: Date.now()
        }]
      }

    case '@@chat/JACKBOT_SAYS':
      return {
        ...state,
        messages: [...state.messages, {
          username: 'JackBot',
          text: action.payload,
          timestamp: Date.now()
        }]
      }
  
    default:
      return state 
  }
}