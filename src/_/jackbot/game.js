import Deck from './deck'

class Game {
  constructor() {
    this.deck = new Deck
    this.deck.shuffle()
  }
}
 
export default Game