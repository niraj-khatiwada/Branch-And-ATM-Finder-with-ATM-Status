import React from 'react'
import { connect } from 'react-redux'

import { CustomInputBase, CustomForm } from '../Search.styles'
import { createStructuredSelector } from 'reselect'
import { useHistory } from 'react-router-dom'

import {
  searchFetchAsync,
  setMapZIndex,
  fetchAutoCompleteAsync,
} from '../../../redux/reducers/search/search.action'
import { isSingleLocation } from '../../../redux/reducers/location/location.action'
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

  const handleDropdown = (checkValue) => {
    if (checkValue.trim().length !== 0) {
      return setsearchDropdownState(true)
    }
  }
  const StartFetch = (value) =>
    setTimerID(setTimeout(() => fetchSearch(value), 1000))

  const handleChange = (evt) => {
    const value = evt.target.value
    handleDropdown(inputState)
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
    handleDropdown(inputState)
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
