import React from 'react'

const Card = ({ suit, face }) => (
  <div className={suit + ' Card'}>
    <div className="container">
      <div className="front">
        <i className="suit top">{suit}</i>
        <span className="face">{face}</span>
        <i className="suit bottom">{suit}</i>
      </div>
      <div className="back"></div>
    </div>
  </div>
)

export default Card