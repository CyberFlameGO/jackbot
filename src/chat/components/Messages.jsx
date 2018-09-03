import React from 'react'
import * as $ from '../../helpers/normalizers'
import './Messages.scss'

const Messages = ({ username, messages }) => (
  <div className="Messages">
    <ul className="messages">
      {messages.map((message, i) => {
        const highlight = (message.text && message.text.toLowerCase().indexOf(`@${username.toLowerCase()}`) > -1)
        return (
          <li key={i} className={highlight ? 'message highlight' : 'message'}>
            <span className="timestamp">{$.formatTimestamp(message.timestamp)}</span>
            <span className="username">{message.username}</span>
            <span className="text">{message.text}</span>
          </li>
        )
      })}
    </ul>
  </div>
)

export default Messages 