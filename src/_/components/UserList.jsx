import React from 'react'
import './UserList.scss'

const UserList = (props) => (
  <div className="UserList">
    <h2>{props.users.length} {props.users.length === 1 ? 'user' : 'users'} online now</h2>
    <ul>
      { props.users.map((user, i) => {
        let time = parseInt((Date.now() - user.timestamp) / 60000, 10)

        if (time < 1)   { time = 'less than a minute' }
        if (time === 1) { time = '1 minute' }
        if (time > 1)   { time = `${time} minutes` }

        return <li key={i} className={user.status}>
          <span className="username">{user.username} <i>{user.type === 'bot' ? 'Bot' : null}</i></span>
          <span className="status">Online for {time}</span>
        </li>
      }) }
    </ul>
  </div>
)

export default UserList 