import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useHistory } from 'react-router-dom'

import { CustomInputBase, SearchWrapper, CustomForm } from './Search.styles'
import SearchDropdown from '../Search  Dropdown/searchDropdown.component'

import {
  searchFetchAsync,
  setMapZIndex,
} from '../../redux/reducers/search/search.action'
import { isSingleLocation } from '../../redux/reducers/location/location.action'
import {
  selectSingleLocation,
  selectSelectedLocationDetail,
} from '../../redux/reducers/location/location.selectors'
import { selectSearchedData } from '../../redux/reducers/search/search.selectors'

//
function Search({
  fetchSearch,
  setMapzIndex,
  isSingleLocationState,
  isSingleLocation,
}) {
  const [inputState, setInputState] = React.useState('')
  const [searchDropdownState, setsearchDropdownState] = React.useState(false)

  const history = useHistory()

  const handleChange = (evt) => {
    setInputState(evt.target.value)
    setsearchDropdownState(true)
  }
  const handleSearchSubmit = (evt) => {
    evt.preventDefault()
    fetchSearch(inputState)
  }
  return (
    <SearchWrapper>
      <CustomForm onSubmit={handleSearchSubmit}>
        <CustomInputBase
          id="searchInput"
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={inputState}
          onChange={handleChange}
          onFocus={() => {
            setsearchDropdownState(true)
            setMapzIndex(-1)
            if (!isSingleLocationState) {
              isSingleLocation()
              history.push('/')
            }
          }}
        />
      </CustomForm>
      {searchDropdownState ? (
        <SearchDropdown handleClose={() => setsearchDropdownState(false)} />
      ) : null}
    </SearchWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  searchData: selectSearchedData,
  selectedLocation: selectSelectedLocationDetail,
  isSingleLocationState: selectSingleLocation,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (searchQuery) => dispatch(searchFetchAsync(searchQuery)),
  isSingleLocation: () => dispatch(isSingleLocation()),
  setMapzIndex: (value) => dispatch(setMapZIndex(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
