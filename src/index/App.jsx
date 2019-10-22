import React, {useCallback} from 'react'
import { connect } from 'react-redux'
import './App.css'
import Header from '../common/header'
import DepartDate from './components/depart-date/depart-date'
import HighSpeed from './components/high-speed/high-speed'
import Journey from './components/journey/journey'
import Submit from './components/submit/submit'
import CitySelector from '../common/city-selector'
import DateSelctor from '../common/date-selector'

function App({isCitySelectorVisible, showDate}) {
  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  return (
    <div>
      <Header title="火车票" onBack={onBack} />
      <form className="form" action="./query.html" method="get">
        <Journey/>
        <DepartDate/>
        <HighSpeed/>
        <Submit/>
      </form>
      {isCitySelectorVisible ? <CitySelector/> : null}
      {showDate ? <DateSelctor/> : null}
    </div>
  )
}

export default connect(
  (state) => {
    return {
      isCitySelectorVisible: state.isCitySelectorVisible,
      showDate: state.isDateSelectorVisible
    }
  },
  (dispatch) => {
    return {}
  }
)(App)