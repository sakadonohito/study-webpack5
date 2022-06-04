import React from 'react'
import Nav from './Nav'
const Header = (props) => (
  <>
    <header>
      <Nav />
      <section>
        <h1>{props.title}</h1>
        <p>Hello, {props.title} page</p>
      </section>
    </header>
 </>
)

export default Header
