import * as _ from 'lodash'

const initialState = {
  playing: false,
  again: false,
  win: false,
  standing: false,
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

export default function blackjackReducer(state = initialState, action) {
  switch (action.type) {
    case '@@blackjack/START_GAME':
      return Object.assign({}, initialState, {
        playing: true,
        deck: action.payload
      })

    case '@@blackjack/QUIT_GAME':
      return {
        state: initialState
      }

    case '@@blackjack/HIT_DEALER':
      var card = state.deck[0]
      var hand = [...state.dealer.hand, {
        ...card, visible: action.payload
      }]
      return {
        ...state,
        deck: _.reject(state.deck, card),
        dealer: {
          hand,
          score: hand.reduce((total, card) => total + card.value, 0)
        }
      }

    case '@@blackjack/HIT_PLAYER':
      card = state.deck[0]
      hand = [...state.player.hand, {
        ...card, visible: action.payload
      }]
      return {
        ...state,
        deck: _.reject(state.deck, card),
        player: {
          hand,
          score: hand.reduce((total, card) => total + card.value, 0)
        }
      }

    case '@@blackjack/PLAYER_STANDS':
      return {
        ...state,
        standing: true
      }

    case '@@blackjack/SHOW_DEALER':
      hand = [...state.dealer.hand]
      hand[1].visible = true
      return {
        ...state,
        dealer: {
          ...state.dealer,
          hand: [...hand]
        }
      }

    case '@@blackjack/PLAYER_LOSES':
      return {
        ...state,
        again: true,
        win: false
      }

    case '@@blackjack/PLAYER_WINS':
      return {
        ...state,
        again: true,
        win: true
      }

    case '@@blackjack/TIED_GAME':
      return {
        ...state,
        again: true
      }

    default:
      return state
  }
}