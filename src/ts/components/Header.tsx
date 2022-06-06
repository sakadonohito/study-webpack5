import React from 'react'
import PropTypes from 'prop-types'

import Nav from './Nav'
import '../../css/Header.css'

const Header = (props) => {
  //console.log(props)
  return (
  <>
    <header>
      <Nav />
      <div className="hero"></div>
      <section>
        <h1>{props.title}</h1>
        <p>Webpack5 setting sample.</p>
      </section>
    </header>
 </>
  )
}

export default Header

Header.propTypes = {
  title: PropTypes.string
}
