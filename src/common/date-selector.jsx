import React, {useCallback} from 'react'
import './date-selector.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hideDateSelector, setDeaprtDate } from '../index/action'
import Header from './header'
import { h0 } from '../util/fp'

function Month({stationTimeMonth, onSelect}) {
  const startDay = new Date(stationTimeMonth)
  const currentDay = new Date(stationTimeMonth)

  let days = []

  while(currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime())
    currentDay.setDate(currentDay.getDate() + 1)
  }
  
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days)
  days = days.concat(new Array(currentDay.getDay() === 0 ? 1 : currentDay.getDay() === 1 ? 0 : 8 - currentDay.getDay()).fill(null))

  let weeks = []

  for (let i = 0; i < days.length / 7; i++) {
    weeks.push(days.slice(i * 7, (i + 1) * 7))
  }

  const tdClass = useCallback((day) => {
    let arr = []
    if (day === null) {
      arr.push('null')
      return arr
    }
    if (day < h0()) {
      arr.push('disabled')
    }
    if ([0, 6].includes(new Date(day).getDay())) arr.push('weekend')

    return arr.join(' ')
  }, [])

  const select = useCallback((day) => {
    if (!day || day < h0()) return
    onSelect(day)
  }, [onSelect])

  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>{startDay.getFullYear() + '年' + (startDay.getMonth() + 1) + '月'}</h5>
          </td>
        </tr>
      </thead>
      <tbody>
          <tr className="date-table-weeks">
            <th>周一</th>
            <th>周二</th>
            <th>周三</th>
            <th>周四</th>
            <th>周五</th>
            <th className="weekend">周六</th>
            <th className="weekend">周日</th>
          </tr>
          {
            weeks.map(days => {
              return (
                <tr className="date-table-days" key={days[0]}>
                  {days.map((day, index) => 
                  <td onClick={() => select(day)} className={tdClass(day)} key={day + index}>{day === h0() ? '今天' : day !== null ? new Date(day).getDate() : ''}</td>)}
                </tr>
              )
            })
          }
        </tbody>
    </table>
  )
}

const DateSelector = ({onSelect, onBack}) => {

  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setDate(1)
  now.setMilliseconds(0)

  const monthSepuence = [now.getTime()]
  now.setMonth(now.getMonth() + 1)
  monthSepuence.push(now.getTime())
  now.setMonth(now.getMonth() + 1)
  monthSepuence.push(now.getTime())

  return (
    <div className="date-selector">
      <Header title="日期选择" onBack={onBack} />
      <div className="date-selector-table">
        {
          monthSepuence.map(month => {
            return <Month onSelect={onSelect} stationTimeMonth={month} key={month} />
          })
        }
      </div>
    </div>
  )
}

DateSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
}

export default connect(
  null,
  (dispatch) => {
    return {
      onBack() {
        dispatch(hideDateSelector())
      },
      onSelect(day) {
        dispatch(setDeaprtDate(day))
        dispatch(hideDateSelector())
      }
    }
  }
)(DateSelector)