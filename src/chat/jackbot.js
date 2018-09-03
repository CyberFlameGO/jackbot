export function hello(username) {
  const responses = [
    `@${username} Wanna play some blackjack? Type /blackjack to start a game.`,
    `@${username} You want a piece of me? Type /blackjack to start a game.`,
    `@${username} Feeling masochistic? Typse /blackjack to get your ass handed to you`,
    `@${username} Type /blackjack if you dare.`,
    `@${username} I'm not scared of you – type /blackjack to get eaten alive.`,
    `@${username} Shut up and give me your money (/blackjack)`
  ]

  return responses[Math.floor(Math.random() * 5)]
}

export function startGame(username) {
  const responses = [
    `@${username} Oh... It's on.`,
    `@${username} You're in for a world of hurt.`,
    `@${username} BRING IT.`,
    `@${username} Give me all your money... and your dignity.`,
    `@${username} Psh. You don't stand a chance.`,
    `@${username} LET'S GO!`
  ]

  return responses[Math.floor(Math.random() * 5)]
}

export function quitGame(username) {
  const responses = [
    `@${username} It's fine if you want to run away.`,
    `@${username} A quitter, eh? No one's surprised.`,
    `@${username} Don't worry, I would be scared too.`,
    `@${username} Don't let the door hit you on the way out.`,
    `@${username} And here I thought you might have what it takes.`,
    `@${username} LATER, SUCKER.`
  ]

  return responses[Math.floor(Math.random() * 5)]
}

export function alreadyPlaying(username) {
  const responses = [
    `@${username} You realize we're already playing... right?`,
    `@${username} I know. You told me already.`,
    `@${username} What, you want a do-over?`,
    `@${username} I'm not trying to play more than one game at a time.`,
    `@${username} But... aren't we already...?`,
    `@${username} We'll finish this game first.`
  ]

  return responses[Math.floor(Math.random() * 5)]
}

export function notPlaying(username) {
  const responses = [
    `@${username} You can't quit what you haven't started.`,
    `@${username} Quit what?`,
    `@${username} If one must quit, one must first start.`,
    `@${username} You have nothing to quit.`,
    `@${username} What are you trying to quit, exactly?`,
    `@${username} You don't have an active game.`
  ]

  return responses[Math.floor(Math.random() * 5)]
}

export function help(username) {
  const responses = [
    `@${username} You realize you're unhelpable, right?`,
    `@${username} I'm just here for card games and petty harassment.`,
    `@${username} I'm busy, ask again later.`,
    `@${username} There's no helping that face, kid.`,
    `@${username} Does your mother know you're here?`,
    `@${username} No.`
  ]

  return responses[Math.floor(Math.random() * 5)]
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