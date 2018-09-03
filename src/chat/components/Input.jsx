import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import './Input.scss'

class Input extends Component {
  render() {
    return (
      <div className="Input">
        <input placeholder="Press enter to send." ref="input" type="text" onKeyUp={this.keyUp} />
      </div>
    )
  }

  keyUp = (event) => {
    event.preventDefault()

    if (event.keyCode === 13 && this.el.value.length > 0) {
      if (this.el.value.charAt(0) === '/') {
        this.props.commandBot(this.el.value)
        return this.el.value = ''
      }

      this.props.socket.emit('MESSAGE', this.el.value)
      this.el.value = ''
    }
  }

  componentDidMount() {
    this.el = findDOMNode(this.refs.input) 
    this.el.focus()
  }
}

export default Input 