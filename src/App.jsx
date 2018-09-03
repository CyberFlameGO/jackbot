import React from 'react'
import { Route, Switch } from 'react-router'
import ChatContainer from './chat/ChatContainer'

const App = () => (
  <div className="App">
    <main>
      <Switch>
        <Route exact path="/" component={ChatContainer} />
      </Switch>
    </main>
  </div>
)
export default App