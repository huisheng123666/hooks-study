import React, {useState, useRef, useMemo, useEffect, memo, useCallback} from 'react'
import './city-selector.css'
import { connect } from 'react-redux'
import { hideCitySelector, fetchCityData, setSelectorCity } from '../index/action'
import propTypes from 'prop-types'

let CityItem = ({name, changeCity}) => {
  return (
    <li onClick={() => changeCity(name)} className="city-li">
      {name}
    </li>
  )
}

CityItem = connect(
  null,
  (dispatch) => {
    return {
      changeCity(city) {
        dispatch(hideCitySelector())
        dispatch(setSelectorCity(city))
      }
    }
  }
)(CityItem)

function CitySection({title, cities = []}) {
  return (
    <ul className="city-ul">
      <li className="city-li" data-cate={title} key="title">
        {title}
      </li>
      {
        cities.map(city => <CityItem name={city.name} key={city.name} />)
      }
    </ul>
  )
}

function CityList({sections}) {
  return (
    <div className="city-list">
      <div className="city-cate">
        {
          sections.map(section => 
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
            />
          )
        }
      </div>
    </div>
  )
}

const AlphaIndex = memo(({alpha, onClick}) => {
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>{alpha}</i>
  )
})

const alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index)
})

const SuggestItem = memo(({name, onClick}) => {
  return (
    <li onClick={() => onClick(name)} className="city-suggest-li">
      {name}
    </li>
  )
})

SuggestItem.propTypes = {
  name: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired
}

const Suggest = memo(({searchKey, onSelect}) => {
  const [result, setResult] = useState([])

  useEffect(() => {
    fetch('/rest/search?key=' + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data
        if (sKey === searchKey) {
          setResult(result)
        }
      })
  }, [searchKey])

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {result.map(city => <SuggestItem key={city.display} name={city.display} onClick={onSelect} />)}
      </ul>
    </div>
  ) 
})

const CitySelector = ({cityData, isLoading, hideCitySelector, fetchCityData, changeCity}) => {
  const [searchKey, setKey] = useState('')
  const inputEl = useRef(null)

  const key = useMemo(() => searchKey.trim(), [searchKey])

  const toAlpha = useCallback((alpha) => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
  }, [])

  useEffect(() => {
    if (cityData) return
    fetchCityData()
  }, [cityData, fetchCityData])

  const outPutSection = () => {
    if (isLoading) return <div>loading...</div>

    if (cityData) {
      return <CityList sections={cityData.cityList} />
    }
    return <div>error</div>
  }
  
  return (
    <div className="city-selector">
      <div className="city-search">
        <div className="search-back" onClick={hideCitySelector}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            ref={inputEl}
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={() => {setKey(inputEl.current.value.trim())}}
          />
        </div>
        {key.length ? <i onClick={() => setKey('')} className="search-clean">&#xf063;</i> : null}
      </div>
      {key ? <Suggest searchKey={key} onSelect={changeCity} /> : null}
      {outPutSection()}
      <div className="city-index">
        {
          alphabet.map(alpha => {
            return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />
          })
        }
      </div>
    </div>
  )
}

CitySelector.propTypes = {
  cityData: propTypes.object,
  isLoading: propTypes.bool.isRequired,
  hideCitySelector: propTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      cityData: state.cityData,
      isLoading: state.isLoadingCityData
    }
  },
  (dispatch) => {
    return {
      hideCitySelector() {
        dispatch(hideCitySelector())
      },
      fetchCityData() {
        dispatch(fetchCityData())
      },
      changeCity(city) {
        dispatch(hideCitySelector())
        dispatch(setSelectorCity(city))
      }
    }
  }
)(CitySelector)