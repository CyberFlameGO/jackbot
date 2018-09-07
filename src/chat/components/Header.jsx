import React from 'react'
import './Header.scss'

const Header = ({ menuOpen, toggleMenu}) => {
  return (
    <header className="Header">
      <button className={menuOpen ? 'open' : null} onClick={toggleMenu}>
        <span></span>
      </button>
    </header>
  )
}

export default Header