import React, {useCallback} from 'react'
import { connect } from 'react-redux'
import './App.css'
import Header from '../common/header'
import DepartDate from './components/depart-date/depart-date'
import HighSpeed from './components/high-speed/high-speed'
import Journey from './components/journey/journey'
import Submit from './components/submit/submit'

function App() {
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  return (
    <div>
      <Header title="火车票" onBack={onBack} />
      <Journey/>
      <DepartDate/>
      <HighSpeed/>
      <Submit/>
    </div>
  )
}

export default connect(
  (state) => {
    return {}
  },
  (dispatch) => {
    return {}
  }
)(App)