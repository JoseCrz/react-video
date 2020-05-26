import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutRequest } from '../actions'
import gravatar from '../utils/gravatar'

import logo from '../assets/static/logo-white.png'
import userIcon from '../assets/static/user-icon.svg'

import '../assets/sass/components/Header.scss'

const Header = props => {
  const { user } = props
  const hasUser = Object.keys(user).length > 0

  const handleLogOut = () => {
    document.cookie = 'id='
    document.cookie = 'name='
    document.cookie = 'email='
    document.cookie = 'token='
    props.logoutRequest({})
    window.location.href = '/login'
  }

  return (
    <header className="Header">
        <figure className="Header__logo-container">
            <Link to="/">
              <img className="Header__logo" src={logo} alt="Reactivid Logo" />
            </Link>
        </figure>
        <nav className="Header__nav">
            <div className="Header__nav-profile">
              { hasUser
              ? <img src={gravatar(user.email)} className="Header__profile" alt="Profile Icon" />
              : <img src={userIcon} className="Header__profile" alt="Profile Icon" />
              }
              <p>Profile</p>
            </div>
            <ul className="Header__nav-menu">
              { hasUser
                ? <li><a href="#">{user.name}</a></li>
                : null
              }

              { hasUser
                ? <li><Link onClick={handleLogOut} to="#">Log out</Link></li>
                : <li><Link to="/login">Log in</Link></li>
              }
            </ul>
        </nav>
    </header>
  )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
  logoutRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)