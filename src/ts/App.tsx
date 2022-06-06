import React from 'react'
import { eating } from './modules/_eat'
import Header from './components/Header'
import SideList from './components/SideList'
import Footer from './components/Footer'
import Article from './components/Article'

const App = () => {
  console.log('Hello! from APP.js')
  eating('Apple')

  return (
    <>
      <Header title={'Hello, Webpack5!'} />
      <div>
        <p>タイトル / カテゴリー</p>
        <SideList />
      </div>
      <Article />
      <Footer />
    </>
  )
}

export default App
