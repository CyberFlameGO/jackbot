import _ from 'lodash'

const initialState = {
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

export function generateDeck() {
  const suits = ['♥', '♦', '♠', '♣']
  const faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K']
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10]

  let cards = []

  suits.forEach((suit) => {
    faces.forEach((face, i) => { 
      cards.push({
        suit,
        face: face,
        value: values[i]
      })
    })
  })

  let deck = [...cards]
  let currentIndex = deck.length
  let temporaryValue
  let randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1;
    temporaryValue = deck[currentIndex]
    deck[currentIndex] = deck[randomIndex]
    deck[randomIndex] = temporaryValue
  }

  return deck
}

export default function blackjack(state = initialState, action) {
  switch (action.type) {
    case '@@blackjack/START_GAME':
      return {
        ...state,
        playing: true,
        deck: generateDeck(),
      }

    case '@@blackjack/DEALER_HIT':
      if (!state.playing) { return state }

      var card = state.deck[0]
      var hand = [...state.dealer.hand, card]

      return {
        ...state,
        deck: _.reject(state.deck, card),
        dealer: {
          hand,
          score: hand.reduce((total, card) => {
            return total + card.value
          }, 0)
        }
      }

    case '@@blackjack/PLAYER_HIT':
      if (!state.playing) { return state }

      var card = state.deck[0]
      var hand = [...state.player.hand, card]

      return {
        ...state,
        deck: _.reject(state.deck, card),
        player: {
          hand,
          score: hand.reduce((total, card) => {
            return total + card.value
          }, 0)
        }
      }
    
    default:
      return state
  }
}