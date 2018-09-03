import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import './ChatInput.scss'

class ChatInput extends Component {
  render() {
    return (
      <div className="ChatInput">
        <input placeholder="Press enter to send." ref="input" type="text" onKeyUp={this.keyUp} />
      </div>
    )
  }

  keyUp = (event) => {
    if (event.keyCode === 13) {
      this.props.submit(event.target.value)

      this.el.value = ''
    }
  }

  componentDidMount() {
    this.el = findDOMNode(this.refs.input) 
    this.el.focus()
  }
}

export default ChatInput 