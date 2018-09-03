import React, { Component } from 'react'
import JackBot from './JackBot'
import './Messages.scss'

class Messages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const messages = this.props.messages

    return (
      <div className="Messages">
        <ul>
          { messages.map((message, i) => <li key={i} className={this.shouldHighlight(message) ? 'highlight' : null}>
            <span className="timestamp">{this.formatTimestamp(message)}</span>
            <span className="username">{message.username}</span>
            <span className={message.username ? "text" : "text bold"}>{message.text}</span>
          </li>
          ) }

          <JackBot />
        </ul>
      </div>
    )
  }

  shouldHighlight(message) {
    const username = `@${this.props.username.toLowerCase()}`

    return (message.text && message.text.toLowerCase().indexOf(username) > -1)
  }

  formatTimestamp(message) {
    const timestamp = new Date(message.timestamp)
    
    let hours   = timestamp.getHours()
    let minutes = timestamp.getMinutes()
    let seconds = timestamp.getSeconds()

    minutes = (`${minutes}`.length === 1) ? `0${minutes}` : minutes
    seconds = (`${seconds}`.length === 1) ? `0${seconds}` : seconds

    return `${hours}:${minutes}:${seconds}`
  }
}

export default Messages 