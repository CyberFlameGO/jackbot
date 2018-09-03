import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Chat from './Chat'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" render={() => (
              <Chat chat={this.props.store.chat} store={this.props.store} dispatch={this.props.dispatch} />
            )} />
          </Switch>
        </main>
      </div>
    )
  }

  componentDidMount() {
    this.props.dispatch({
      type: '@@test'
    })
  }
}

const mapStateToProps = (store) => {
  return { store }
}

export default connect(mapStateToProps)(App)