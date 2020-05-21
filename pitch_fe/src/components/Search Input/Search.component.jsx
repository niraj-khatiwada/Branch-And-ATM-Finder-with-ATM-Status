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

  const handleChange = (evt) => {
    const value = evt.target.value
    setInputState(value)
    if (value.trim().length > 0) {
      setsearchDropdownState(true)
      if (timerID) {
        clearTimeout(timerID)
        setTimerID(
          setTimeout(() => {
            return fetchSearch(value)
          }, 1500)
        )
      } else {
        setTimerID(setTimeout(() => fetchSearch(value), 1500))
      }
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
            onFocus={() => {
              setMapzIndex(-1)
              if (inputState.trim().length !== 0) {
                setsearchDropdownState(true)
              }
              if (!isSingleLocationState) {
                isSingleLocation()
                history.push('/')
              }
            }}
          />
        </CustomForm>
        {searchDropdownState ? (
          <SearchDropdown
            handleClose={() => {
              if (timerID) {
                clearTimeout(timerID)
              }
              setsearchDropdownState(false)
            }}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
