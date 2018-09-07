import React from 'react'
import './Card.scss'

const Card = ({ card }) => (
  <div className={card.suit + ' Card'}>
    <div className={card.visible ? 'container visible' : 'container'}>
      <div className="front">
        <i className="suit top">{card.suit}</i>
        <span className="face">{card.face}</span>
        <i className="suit bottom">{card.suit}</i>
      </div>
      <div className="back"></div>
    </div>
  </div>
)

export default Card