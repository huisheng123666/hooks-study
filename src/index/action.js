export const ACTION_SET_FROM = 'SET_FROM'

export const ACTION_SET_TO = 'SET_TO'

export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE'

export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY'

export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA'

export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA'

export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE'

export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED'

export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'

export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from
  }
}

export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to
  }
}

export function setIsLoadingCityData(isLoadingCityData) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData
  }
}

export function setCityData(cityData) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData
  }
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState()
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed
    })
  }
}

export function showCitySelector(currentSelectingLeftCity) {
  return (dispacth) => {
    dispacth({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    })

    dispacth({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity
    })
  }
}

export function hideCitySelector() {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false
  }
}

export function setSelectorCity(city) {
  return (dispatch, getState) => {
    const {currentSelectingLeftCity} = getState()

    if (currentSelectingLeftCity) {
      dispatch(setFrom(city))
    } else {
      dispatch(setTo(city))
    }
  }
}

export function showDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true
  }
}

export function hideDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false
  }
}

export function exchangeFromTo() {
  return (dispacth, getState) => {
    const { from, to } = getState()

    dispacth(setFrom(to))
    dispacth(setTo(from))
  }
}

export function setDeaprtDate(date) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: date
  }
}

export function fetchCityData() {
  return (dispacth, getState) => {
    const { isLoadingCityData } = getState()
    if (isLoadingCityData) return

    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}')
    if (Date.now() < cache.expires) {
      dispacth(setCityData(cache.data))
      return
    }

    dispacth(setIsLoadingCityData(true))
    fetch('/rest/cities?_' + Date.now())
      .then(res => res.json())
      .then(cityData => {
        dispacth(setCityData(cityData))
        localStorage.setItem('city_data_cache', JSON.stringify({
          expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
          data: cityData
        }))
        dispacth(setIsLoadingCityData(false))
      })
      .catch(err => {
        dispacth(setIsLoadingCityData(false))
      })
  }
}