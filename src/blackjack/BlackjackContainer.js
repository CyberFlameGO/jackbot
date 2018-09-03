import { connect } from 'react-redux'
import Blackjack from './Blackjack'
import actions from './actions'

const mapStateToProps = (state) => {
  const { 
    playing,
    again,
    win,
    standing,
  } = state.blackjack

  const {
    username
  } = state.chat

  return {
    playing,
    again,
    win,
    standing,
    username
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
)(Blackjack)

export default BlackjackContainer