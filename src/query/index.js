import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import 'normalize.css/normalize.css'
import App from './App.jsx'
import store from './store'

console.log(document.getElementById('root'))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'))