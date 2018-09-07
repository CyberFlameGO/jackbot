import * as BlackjackActions from '../blackjack/actions'
import * as ChatActions from '../chat/actions'

export function hello(username) {
  const responses = [
    `Ready to lose, @${username}? Type /play to start a game!`
  ]

  return responses[Math.floor(Math.random() * (responses.length - 1))]
}

export function startGame(username) {
  const responses = [
    `/hit • /stand`
  ]

  return responses[Math.floor(Math.random() * (responses.length - 1))]
}

export function quitGame(username) {
  const responses = [
    `It's fine if you want to run away.`,
    `A quitter, eh? No one's surprised.`,
    `Don't worry, I would be scared too.`,
    `Don't let the door hit you on the way out.`,
    `And here I thought you might have what it takes.`,
    `LATER, SUCKER.`
  ]

  return responses[Math.floor(Math.random() * (responses.length - 1))]
}

export function youLose(username) {
  const responses = [
    `YOU LOSE! Play again? /yes • /no`
  ] 

  return responses[Math.floor(Math.random() * (responses.length - 1))]
}

export function youWin(username) {
  const responses = [
    `YOU WIN! ...and I let you, obviously. Play again? /yes • /no`,
    `YOU WIN! I bet you think you're hot stuff. Play again? /yes • /no`,
    `YOU WIN! I demand a recount. Play again? /yes • /no`,
    `YOU WIN! I'm going to remember this. Play again? /yes • /no`,
    `YOU WIN! Play again? /yes • /no`,
    `YOU WIN! What did you expect, confetti? Play again? /yes • /no`
  ]

  return responses[Math.floor(Math.random() * (responses.length - 1))]
}

export function tiedGame(username) {
  const responses = [
    `IT'S A TIE! Play again? /yes • /no`
  ] 

  return responses[Math.floor(Math.random() * (responses.length - 1))]
}

export function alreadyPlaying(username) {
  const responses = [
    `You realize we're already playing... right?`,
    `What, you want a do-over?`,
    `I'm not trying to play more than one game at a time.`,
    `We'll finish this game first.`
  ]

  return responses[Math.floor(Math.random() * (responses.length - 1))]
}

export function notPlaying(username) {
  const responses = [
    `You can't quit what you haven't started.`,
    `If one must quit a game, one must first start.`,
    `What are you trying to quit, exactly?`,
    `You don't have an active game.`
  ]

  return responses[Math.floor(Math.random() * (responses.length - 1))]
}

export function generateDeck() {
  const suits = ['♥', '♦', '♠', '♣']
  const faces = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A']
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 11]

  let cards = []

  suits.forEach((suit) => {
    faces.forEach((face, i) => { 
      cards.push({
        suit,
        face,
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

export function play(dispatch, getState) {
  const { chat, blackjack } = getState()
  const username = chat.username

  if (!blackjack.playing) {
    var response = startGame(username)
    dispatch(BlackjackActions.startGame(generateDeck()))
    dispatch(BlackjackActions.hitDealer())
    dispatch(BlackjackActions.hitDealer(false))
    dispatch(BlackjackActions.hitPlayer())
    dispatch(BlackjackActions.hitPlayer())
    dispatch(ChatActions.jackBotSays(response))
    var playerScore = getState().blackjack.player.score
    if (playerScore === 21) {
      response = youWin(username)
      dispatch(BlackjackActions.playerWins())
      dispatch(ChatActions.jackBotSays(response))
    }
  } else {
    response = alreadyPlaying(username)
    dispatch(ChatActions.jackBotSays(response))
  }
}

export function quit(dispatch, getState) {
  const { chat, blackjack } = getState()
  const username = chat.username
  
  if (!blackjack.playing) {
    var response = notPlaying(username)
    dispatch(ChatActions.jackBotSays(response))
  } else {
    response = quitGame(username)
    dispatch(BlackjackActions.quitGame())
    dispatch(ChatActions.jackBotSays(response))
  }
}

export function hit(dispatch, getState) {
  const { chat, blackjack } = getState()
  const username = chat.username
  
  if (blackjack.playing && !blackjack.again && !blackjack.standing) {
    dispatch(BlackjackActions.hitPlayer())
    var playerScore = getState().blackjack.player.score
    if (playerScore > 21) {
      var response = youLose(username)
      dispatch(BlackjackActions.playerLoses())
      dispatch(ChatActions.jackBotSays(response))
    }

    if (playerScore === 21) {
      response = youWin(username)
      dispatch(BlackjackActions.playerWins())
      dispatch(ChatActions.jackBotSays(response))
    }
  }
}

export function stand(dispatch, getState) {
  const { chat, blackjack } = getState()
  const username = chat.username

  if (blackjack.playing && !blackjack.again) {
    dispatch(BlackjackActions.playerStands())
    dispatch(BlackjackActions.showDealer())
    const interval = setInterval(() => {
      if (getState().blackjack.dealer.score > 17) {
        clearInterval(interval)
        var dealerScore = getState().blackjack.dealer.score
        var playerScore = getState().blackjack.player.score
        if ((playerScore <= 21 && playerScore > dealerScore) || dealerScore > 21) {
          var response = youWin(username)
          dispatch(BlackjackActions.playerWins())
          dispatch(ChatActions.jackBotSays(response))
        }
        if (dealerScore <= 21 && playerScore < dealerScore) {
          response = youLose(username)
          dispatch(BlackjackActions.playerLoses())
          dispatch(ChatActions.jackBotSays(response))
        }
        if (dealerScore === playerScore) {
          response = tiedGame(username)
          dispatch(BlackjackActions.tiedGame())
          dispatch(ChatActions.jackBotSays(response))
        }
      } else {
        dispatch(BlackjackActions.hitDealer())
      }
    }, 750)
  }
}

export function yes(dispatch, getState) {
  const { chat, blackjack } = getState()
  const username = chat.username

  if (blackjack.playing && blackjack.again) {
    var response = startGame(username)
    dispatch(BlackjackActions.startGame(generateDeck()))
    dispatch(BlackjackActions.hitDealer())
    dispatch(BlackjackActions.hitDealer(false))
    dispatch(BlackjackActions.hitPlayer())
    dispatch(BlackjackActions.hitPlayer())
    dispatch(ChatActions.jackBotSays(response))
  }
}

export function no(dispatch, getState) {
  const { chat, blackjack } = getState()
  const username = chat.username

  if (blackjack.playing && blackjack.again) {
    var response = quitGame(username)
    dispatch(BlackjackActions.quitGame())
    dispatch(ChatActions.jackBotSays(response))
  }
}

export function greet(dispatch, getState) {
  const { chat } = getState()
  const username = chat.username
  const response = hello(username)
  return dispatch(ChatActions.jackBotSays(response))
}