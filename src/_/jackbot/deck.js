const suits = ['♥', '♦', '♠', '♣']
const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K']
const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10]

class Deck {
  constructor() {
    this.cards = []
    this.build()
  }

  build() {
    suits.forEach((suit) => {
      cards.forEach((card, i) => {
        this.cards.push({
          suit,
          face: card,
          value: value[i]
        })
      })
    })
  }

  shuffle() {
    let cards = [...this.cards]
    let currentIndex = this.cards.length
    let temporaryValue
    let randomIndex

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1;
      temporaryValue = cards[currentIndex]
      cards[currentIndex] = cards[randomIndex]
      cards[randomIndex] = temporaryValue
    }

    this.cards = cards
  }

  placeCard() {
    const card = this.cards[0]
    this.cards.shift()
    return card
  }
}

export default Deck