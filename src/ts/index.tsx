//import React, { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
//import { BrowserRouter } from 'react-router-dom'

//import '../css/index.css';
import App from './App';
import { greet } from './modules/_greet'

//const root = createRoot(document.getElementById('root'));

document.addEventListener('DOMContentLoaded', () => {
  console.log('hoge!! from index.js');
  greet('Hello')
  App();
//  root.render(
//    <div><p>Hoge</p></div>
//    <StrictMode>
//      <BrowserRouter>
//        <App />
//      </BrowserRouter>
//    </StrictMode>
//  )
})
