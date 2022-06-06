import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import { BrowserRouter } from 'react-router-dom'

import App from './App';
import { greet } from './modules/_greet'

const root = createRoot(document.getElementById('root'))

document.addEventListener('DOMContentLoaded', () => {
  console.log('hoge!! from index.js');
  greet('Hello')
  App();
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
//      <BrowserRouter>

//      </BrowserRouter>

  )
})
