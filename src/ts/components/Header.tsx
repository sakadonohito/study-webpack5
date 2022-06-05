import React from 'react'
import Nav from './Nav'
import '../../css/Header.css'

const Header = (props) => (
  <>
    <header>
      <Nav />
      <div className="hero"></div>
      <section>
        <h1>{props.title}</h1>
        <p>Hello, {props.title} page</p>
      </section>
    </header>
 </>
)

export default Header
