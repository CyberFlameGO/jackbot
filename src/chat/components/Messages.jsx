import React from 'react'
import './Messages.scss'

function shouldHighlight(message, username) {
  return (message.text && message.text.toLowerCase().indexOf(`@${username.toLowerCase()}`) > -1)
}

function formatTimestamp(timestamp) {
  const time = new Date(timestamp)
    
  let hours   = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()

  minutes = (`${minutes}`.length === 1) ? `0${minutes}` : minutes
  seconds = (`${seconds}`.length === 1) ? `0${seconds}` : seconds

  return `${hours}:${minutes}:${seconds}`
}

const Messages = ({
  username,
  messages
}) => (
  <div className="Messages">
    <ul>
      {messages.map((message, i) => {
        return (
          <li key={i} className={shouldHighlight(message, username) ? 'highlight' : null}>
            <span className="timestamp">{formatTimestamp(message.timestamp)}</span>
            <span className="username">{message.username}</span>
            <span className={message.username ? "text" : "text bold"}>{message.text}</span>
          </li>
        )
      })}
    </ul>
  </div>
)

export default Messages 