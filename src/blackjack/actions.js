export function startGame(deck) {
  return { type: '@@blackjack/START_GAME', payload: deck }
}

export function quitGame() {
  return { type: '@@blackjack/QUIT_GAME' }
}

export function hitDealer(visible = true) {
  return { type: '@@blackjack/HIT_DEALER', payload: visible }
}

export function hitPlayer(visible = true) {
  return { type: '@@blackjack/HIT_PLAYER', payload: visible }
}

export function playerStands() {
  return { type: '@@blackjack/PLAYER_STANDS' }
}

export function showDealer() {
  return { type: '@@blackjack/SHOW_DEALER' }
}

export function playerLoses() {
  return { type: '@@blackjack/PLAYER_LOSES' }
}

export function playerWins() {
  return { type: '@@blackjack/PLAYER_WINS' }
}

export function tiedGame() {
  return { type: '@@blackjack/TIED_GAME' }
}

export default {
  startGame,
  quitGame,
  hitDealer,
  hitPlayer,
  playerStands,
  showDealer,
  playerLoses,
  playerWins,
  tiedGame
}