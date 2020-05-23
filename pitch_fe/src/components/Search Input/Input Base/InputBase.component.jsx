import React from 'react'
import { CustomInputBase, CustomForm } from '../Search.styles'
import { createStructuredSelector } from 'reselect'
import { useHistory } from 'react-router-dom'

import {
  searchFetchAsync,
  setMapZIndex,
} from '../../../redux/reducers/search/search.action'
import { isSingleLocation } from '../../../redux/reducers/location/location.action'
import { connect } from 'react-redux'
import { selectSingleLocation } from '../../../redux/reducers/location/location.selectors'

function InputBase({
  fetchSearch,
  setMapzIndex,
  isSingleLocation,
  setsearchDropdownState,
  isSingleLocationState,
}) {
  const [inputState, setInputState] = React.useState('')
  const [timerID, setTimerID] = React.useState(null)
  const history = useHistory()

  const StartFetch = (value) =>
    setTimerID(setTimeout(() => fetchSearch(value), 1500))

  const handleChange = (evt) => {
    const value = evt.target.value
    setInputState(value)
    if (timerID) {
      clearTimeout(timerID)
      StartFetch(value)
    } else {
      StartFetch(value)
    }
  }
  const handleSearchSubmit = (evt) => {
    evt.preventDefault()
    if (inputState.trim().length !== 0) {
      if (timerID) {
        clearTimeout(timerID)
      }
      fetchSearch(inputState)
    }
  }
  const handleFocus = () => {
    setMapzIndex(-1)
    setsearchDropdownState(true)
    if (!isSingleLocationState) {
      isSingleLocation()
      history.push('/')
    }
  }
  return (
    <CustomForm onSubmit={handleSearchSubmit}>
      <CustomInputBase
        id="searchInput"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={inputState}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </CustomForm>
  )
}

const mapStateToProps = createStructuredSelector({
  isSingleLocationState: selectSingleLocation,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (searchQuery) => dispatch(searchFetchAsync(searchQuery)),
  isSingleLocation: () => dispatch(isSingleLocation()),
  setMapzIndex: (value) => dispatch(setMapZIndex(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InputBase)
