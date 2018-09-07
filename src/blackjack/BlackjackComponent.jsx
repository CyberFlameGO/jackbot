import React from 'react'
import Card from './components/Card'
import './Blackjack.scss'

const Blackjack = ({
  username,
  standing,
  player,
  dealer
}) => (
  <div className="Blackjack">
    <div>
      <div className="player">
        <h3>{username} <span>{standing ? '(STAND)' : null}</span></h3>
        {player.hand.map((card, i) => (
          <Card card={card} key={i} />
        ))}
      </div>

      <div className="dealer">
        <h3>JackBot</h3>
        {dealer.hand.map((card, i) => (
          <Card card={card} key={i} />
        ))}
      </div>
    </div>
  </div>
)

export default Blackjack