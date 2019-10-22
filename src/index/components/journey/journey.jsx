import React from 'react'
import './journey.css'
import { connect } from 'react-redux'
import { exchangeFromTo, showCitySelector } from '../../action' 
const Joureny = ({from, to, exchangeFromTo, showCitySelector}) => {
  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch" onClick={exchangeFromTo}>
        <img
          src={require('../../../imgs/switch.svg')}
          width="70"
          height="40"
          alt="switch"/>
      </div>
      <div className="journey-station" onClick={() => showCitySelector(false)}>
        <input
            type="text"
            readOnly
            name="to"
            value={to}
            className="journey-input journey-from"
          />
      </div>
    </div>
  )
}

export default connect(
  (state) => {
    return state
  },
  (dispatch) => {
    return {
      exchangeFromTo() {
        dispatch(exchangeFromTo())
      },
      showCitySelector(show) {
        dispatch(showCitySelector(show))
      }
    }
  }
)(Joureny)