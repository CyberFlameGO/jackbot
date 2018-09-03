import React, { Component } from 'react'
import { connect } from 'react-redux'

import './JackBot.scss'

class JackBot extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="JackBot">
        { this.props.active && <div>
          { this.props.player.hand.map((card) => {
            <span className={card.suit + ' card'}>
              <span className="face">{card.face}</span>
            </span>
          })}
        </div> }
      </div>
    )
  }

  listen(message) {
    if (message.text.toLowerCase().indexOf(this.name.toLowerCase()) > -1) {
      this.initialResponse()
    }
  }

  initialResponse() {
    const responses = [
      `Hey @${this.username}! Wanna play some blackjack? Type /blackjack to start a game.`,
      `You want a piece of me, @${this.username}? Type /blackjack to start a game.`,
      `Feeling masochistic, @${this.username}? Typse /blackjack to get your ass handed to you`,
      `Type /blackjack if you dare, @${this.username}.`,
      `I'm not scared of you, @${this.username}. Type /blackjack to get eaten alive.`
    ]
  
    const message = {
      username: 'JackBot',
      text: responses[Math.floor(Math.random() * 5)],
      timestamp: Date.now()
    }

    this.dispatch({
      type: '@@chat/NEW_MESSAGE',
      payload: message
    })
  }

  processCommand(command) {
    const blackjackResponses = [
      `@${command.username} Oh... It's on.`,
      `@${command.username} You're in for a world of hurt.`,
      `@${command.username} BRING IT.`,
      `@${command.username} Give me all your money... and your dignity.`,
      `@${command.username} Psh. You don't stand a chance.`,
      `@${command.username} LET'S GO!`
    ]

    const helpResponses = [
      `@${command.username} You realize you're unhelpable, right?`,
      `@${command.username} I'm just here for card games and petty harassment.`,
      `@${command.username} I'm busy, ask again later.`,
      `@${command.username} There's no helping that face, kid.`,
      `@${command.username} Does your mother know you're here?`,
      `@${command.username} No.`
    ]

    switch (command.text) {
      case '/blackjack':
        if (this.store.blackjack.playing) { return }
        this.dispatch({
          type: '@@chat/NEW_MESSAGE',
          payload: { 
            username: this.name,
            timestamp: Date.now(),
            text: blackjackResponses[Math.floor(Math.random() * 5)]
          }
        })
        return this.startGame()

      case '/help':
        return this.dispatch({
          type: '@@chat/NEW_MESSAGE',
          payload: {
            username: this.name,
            timestamp: Date.now(),
            text: helpResponses[Math.floor(Math.random() * 5)]
          }
        })

      default:
        return
    }
  }

  startGame() {
    this.dispatch({ type: '@@blackjack/START_GAME' })
    this.dispatch({ type: '@@blackjack/DEALER_HIT' })
    this.dispatch({ type: '@@blackjack/PLAYER_HIT' })
  }
}

const mapStateToProps = (store) => {
  return {
    active: store.blackjack.playing,
    player: store.blackjack.player,
    dealer: store.blackjack.dealer
  }
}

export default connect(mapStateToProps)(JackBot)