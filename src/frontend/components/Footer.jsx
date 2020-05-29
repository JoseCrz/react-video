import React from 'react'
import { Link } from 'react-router-dom'

import '../assets/sass/components/Footer.scss'

const Footer = () => {
  return (
    <footer className="Footer">
      <a to="/" className="Footer__link">Terms & Conditions</a>
      <a to="/" className="Footer__link">Privacy</a>
      <a to="/" className="Footer__link">Help Center</a>
    </footer>
  )
}

export default Footer