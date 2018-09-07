import { connect } from 'react-redux'
import BlackjackComponent from './BlackjackComponent'
import actions from './actions'

const mapStateToProps = (state) => {
  const { 
    playing,
    again,
    win,
    standing,
    player,
    dealer
  } = state.blackjack

  const {
    username
  } = state.chat

  return {
    playing,
    again,
    win,
    standing,
    username,
    player,
    dealer
  }
}

const mapDispatchToProps = (dispatch) => {
  const startGame = () => dispatch(actions.startGame())
  const quitGame = () => dispatch(actions.quitGame())
  const hitDealer = () => dispatch(actions.hitDealer())
  const hitPlayer = () => dispatch(actions.hitPlayer())
  const playerStands = () => dispatch(actions.playerStands())
  const showDealer = () => dispatch(actions.showDealer())
  const playerLoses = () => dispatch(actions.playerLoses())
  const playerWins = () => dispatch(actions.playerWins())
  const tiedGame = () => dispatch(actions.tiedGame())

  return {
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
}

const BlackjackContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlackjackComponent)

export default BlackjackContainer