import React from 'react'
import './Blackjack.scss'

const Blackjack = ({ game }) => (
  <div className="Blackjack">
    <h2>Current Game</h2>

    <h3>Dealer</h3>
    <ul className="cards">
      {game.dealer.hand.map((card, i) => (
        <li key={i} className="scene">
          <div className="card">
            <div className={card.suit + ' front'}>{card.face}</div>
            <div className="back"></div>
          </div>
        </li>
      ))}
    </ul>

    <h3>Hand</h3>
    <ul className="cards">
      {game.player.hand.map((card, i) => (
        <li key={i} className="scene">
          <div className="card">
            <div className={card.suit + ' front'}>{card.face}</div>
            <div className="back"></div>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

export default Blackjack  