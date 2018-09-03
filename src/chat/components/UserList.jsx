import React from 'react'
import Blackjack from './Blackjack'
import './UserList.scss'

const UserList = ({
  users,
  game
}) => {
  const USERS = users.length === 1 ? 'user' : 'users'
  const TIME = (timestamp) => {
    let time = parseInt((Date.now() - timestamp) / 60000, 10)
    if (time < 1) { time = 'less than a minute' }
    if (time === 1) { time = '1 minute' }
    if (time > 1) { time = `${time} minutes` }
    return time
  }

  return (
    <div className="UserList">
      <h2>{users.length} {USERS} online now</h2>
      <ul className="users">
        {users.map((user, i) => {
          return <li key={i} className={user.status}>
            <span className="username">{user.username} <i>{user.type === 'bot' ? 'Bot' : null}</i></span>
            <span className="status">Online for {TIME(user.timestamp)}</span>
          </li>
        })}
      </ul>
      
      { game.playing && <Blackjack game={game} /> }
    </div>
  )
}

export default UserList 