import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { loginUser } from '../actions'

import twitterIcon from '../assets/static/twitter-icon.svg'
import googleIcon from '../assets/static/google-icon.svg'

import '../assets/sass/components/Login.scss'

const Login = props => {
  const [form, setForm] = useState({
    email:'',
  })

  const handleOnChange = event => {
    event.preventDefault()

    setForm({
      ...form,
      [event.target.name]: event.target.value
    })

  }

  const handleOnSubmit = event => {
    event.preventDefault()
    props.loginUser(form, '/')
  }

  return (
    <section className="Login">
        <div className="Login__container">
            <h1 className="Login__title">Welcome</h1>
            <form onSubmit={handleOnSubmit}  className="Login__form">
                <input name="email" onChange={handleOnChange} className="Login__input" type="email" placeholder="User/Email" aria-label="Enter user or email" />
                <input name="password" onChange={handleOnChange} className="Login__input" type="password" placeholder="Password" aria-label="Enter password"  />
                <button className="Login__button" aria-label="Login in button" type="submit">Sign in</button>
                <div className="Login__options">
                    <label className="Login__label" htmlFor="remember">
                        <input id="remember" type="checkbox" value="remember" name="remember" />Remember me
                    </label>
                    <Link className="Login__link" to="/">Forgot my password</Link>
                </div>
            </form>
            <article className="Login__social">
                <figure className="Login__img-container Login__img-container--icon-text">
                    <img src={googleIcon} alt="Google icon" width="30px" />
                    <Link to="/" className="Login__link">Sign in with Google</Link>
                </figure>
                <figure className="Login__img-container Login__img-container--icon-text">
                    <img src={twitterIcon} alt="Twitter icon" width="30px" />
                    <Link to="/" className="Login__link">Sign in with Twitter</Link>
                </figure>
            </article>
            <article className="Login__sign-up">
                <p>Don't have an account? <Link to="/register" className="Login__link Login__link--bold">Sign up!</Link></p>
            </article>
        </div>
    </section>
  )
}

const mapDispatchToProps = {
  loginUser
}

export default connect(null, mapDispatchToProps)(Login)