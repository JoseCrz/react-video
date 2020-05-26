import React, {useState}  from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { registerUser } from '../actions'

import '../assets/sass/components/Login.scss'

const Register = props => {
  const [form, setForm] = useState({
    email:'',
    name: '',
    password:''
  })

  const handleInput = event => {
    setForm({
      ...form,
      [event.target.name] : event.target.value
    })
  }

  const handleOnSubmit = event => {
    event.preventDefault()
    props.registerUser(form, '/login')
  }

  return (
    <section className="Login">
        <div className="Login__container Login__container--Login-up">
            <h1 className="Login__title">Don't have an account?</h1>
            <form onSubmit={handleOnSubmit} className="Login__form Login__form--Login-up">
                <input onChange={handleInput} name="name" className="Login__input" type="text" placeholder="Username" aria-label="Enter a username" />
                <input onChange={handleInput} name="email" className="Login__input" type="email" placeholder="Email" aria-label="Enter an email" />
                <input onChange={handleInput} name="password" className="Login__input" type="password" placeholder="Password" aria-label="Enter a password" />
                <button className="Login__button" type="submit" aria-label="Login up button">Login up</button>
            </form>
            <article className="Login__sign-up">
                <p>Already a member? <Link to="./login" className="Login__link Login__link--bold">Log in</Link></p>
            </article>
        </div>
    </section>
  )
}

const mapDispathToProps = {
  registerUser
}

export default connect(null, mapDispathToProps)(Register)