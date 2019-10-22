import React, {useMemo} from 'react'
import './depart-date.css'
import { h0 } from '../../../util/fp'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { showDateSelector } from '../../action'

const DepartDate = ({time, showSelect}) => {

  const h0Deaprt = h0(time)

  const departDateString = useMemo(() => dayjs(h0Deaprt).format('YYYY-MM-DD'), [h0Deaprt])

  const weekStr = '周' + ['日', '一', '二', '三', '四', '五', '六'][new Date(time).getDay()]

  const isToday = useMemo(() => h0Deaprt === h0(), [h0Deaprt])

  return (
    <div className="depart-date" onClick={showSelect}>
      <input type="hidden" name="date" value={departDateString} />
      {departDateString} <span className="depart-week">{isToday ? '今天' : weekStr}</span>
    </div>
  )
}

DepartDate.propTypes = {
  time: propTypes.number.isRequired,
  showSelect: propTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      time: state.departDate
    }
  },
  (dispatch) => {
    return {
      showSelect() {
        dispatch(showDateSelector())
      }
    }
  }
)(DepartDate)