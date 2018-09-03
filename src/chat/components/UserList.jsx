import React from 'react'
import * as $ from '../../helpers/normalizers'
import './UserList.scss'

const UserList = ({ users }) => (
  <div className="UserList">
    <h1>JB</h1>
    <h2>{$.pluralize(users.length, 'user')} online now</h2>
    <ul className="users">
      {users.map((user, i) => {
        return <li key={i} className={user.status}>
          <span className="username">{user.type === 'bot' ? '@' : null}{user.username} <i>{user.type === 'bot' ? 'Bot' : null}</i></span>
          <span className="status">Online for {$.timeOnline(user.timestamp)}</span>
        </li>
      })}
    </ul>
  </div>
)

export default UserList 