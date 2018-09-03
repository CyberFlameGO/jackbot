import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import './Login.scss'

class Login extends Component {
  render() {
    return (
      <form className="Login" onSubmit={this.submit}>
        <div className="container">
          <h1>Enter a username</h1>
          <input ref="input" type="text" />
          <button type="submit">Join</button>
        </div>
      </form>
    )
  }

  componentDidMount() {
    this.el = findDOMNode(this.refs.input)
    this.el.focus()
  }

  submit = ($event) => {
    $event.preventDefault()
    this.props.socket.emit('LOGIN', this.el.value)
  }
}

export default Login 