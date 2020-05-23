import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useHistory } from 'react-router-dom'

import { CustomInputBase, SearchWrapper, CustomForm } from './Search.styles'
import SearchDropdown from '../Search  Dropdown/searchDropdown.component'
import {
  WithSpinner,
  SearchWithSpinnerWrapper,
} from '../../components/HOC withSpinner/withSpinner.styles'

import {
  searchFetchAsync,
  setMapZIndex,
} from '../../redux/reducers/search/search.action'
import { isSingleLocation } from '../../redux/reducers/location/location.action'
import {
  selectSingleLocation,
  selectSelectedLocationDetail,
} from '../../redux/reducers/location/location.selectors'
import {
  selectSearchedData,
  selectIsSearchFetching,
} from '../../redux/reducers/search/search.selectors'

//
function Search({
  fetchSearch,
  setMapzIndex,
  isSingleLocationState,
  isSingleLocation,
  isSearching,
}) {
  const [inputState, setInputState] = React.useState('')
  const [searchDropdownState, setsearchDropdownState] = React.useState(false)
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
  const handleClose = () => {
    if (timerID) {
      clearTimeout(timerID)
    }
    setsearchDropdownState(false)
  }
  return (
    <>
      <SearchWrapper>
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
        {searchDropdownState ? (
          <SearchDropdown handleClose={handleClose} />
        ) : null}
        <SearchWithSpinnerWrapper>
          {isSearching ? <WithSpinner></WithSpinner> : null}
        </SearchWithSpinnerWrapper>
      </SearchWrapper>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  searchData: selectSearchedData,
  selectedLocation: selectSelectedLocationDetail,
  isSingleLocationState: selectSingleLocation,
  isSearching: selectIsSearchFetching,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (searchQuery) => dispatch(searchFetchAsync(searchQuery)),
  isSingleLocation: () => dispatch(isSingleLocation()),
  setMapzIndex: (value) => dispatch(setMapZIndex(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search))
