import React from 'react'
import './high-speed.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleHighSpeed } from '../../action'

const HighSpeed = ({highSpeed, toogle}) => {
  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁/动车</div>
      <div className="high-speed-switch" onClick={toogle}>
        <input type="hidden" name="high-speed" value={highSpeed} />
        <div className={`high-speed-track ${highSpeed ? 'checked' : ''}`}>
          <span className={`high-speed-handle ${highSpeed ? 'checked' : ''}`}></span>
        </div>
      </div>
    </div>
  )
}

HighSpeed.propTypes = {
  highSpeed: PropTypes.bool.isRequired,
  toogle: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      highSpeed: state.highSpeed
    }
  },
  (dispatch) => {
    return {
      toogle() {
        dispatch(toggleHighSpeed())
      }
    }
  }
)(HighSpeed)