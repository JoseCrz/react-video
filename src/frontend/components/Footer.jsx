import React from 'react'
import { Link } from 'react-router-dom'

import '../assets/sass/components/Footer.scss'

const Footer = () => {
  return (
    <footer className="Footer">
      <Link to="/" className="Footer__link">Terms & Conditions</Link>
      <Link to="/" className="Footer__link">Privacy</Link>
      <Link to="/" className="Footer__link">Help Center</Link>
    </footer>
  )
}

export default Footer