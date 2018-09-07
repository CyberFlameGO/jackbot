import React from 'react'
import { Route, Switch } from 'react-router'
import ChatContainer from './chat/ChatContainer'
import './App.scss'

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={ChatContainer} />
    </Switch>
  </div>
)

export default App