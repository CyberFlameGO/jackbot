import _ from 'lodash'

const initialState = {
  authenticated: false,
  username: '',
  users: [],
  messages: []
}

export default function chat(state = initialState, action) {
  switch (action.type) {
    case '@@chat/AUTH':
      var { users, messages } = action.payload
      return {
        ...state,
        authenticated: true,
        username: users[users.length - 1].username,
        users: users
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
      if (action.payload.card) {
        return {
          ...state,
          messages: [...state.messages, action.payload]
        }  
      }

      if (action.payload.text.length === 0) {
        return state
      }

      return {
        ...state,
        messages: [...state.messages, action.payload]
      }

    default:
      return state
  }
}