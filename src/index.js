import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { combineReducers } from 'redux'
import chatReducer from './chat/reducer'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import SocketContext from './socket-context'
import * as io from 'socket.io-client'
import './index.scss'


const reducer = combineReducers({
  chat: chatReducer
}) 
const socket = io('http://0.0.0.0:3333')
const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(reducer),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      logger
    )
  )
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> 
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()