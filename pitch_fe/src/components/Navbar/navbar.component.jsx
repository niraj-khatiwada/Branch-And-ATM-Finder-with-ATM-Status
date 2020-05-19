import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { AppBar, Toolbar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import {
  SearchWrapper,
  CustomInputBase,
  SidebarWrapper,
  CustomTypography,
  CustomForm,
  CustomButton,
  CustomToolbar,
} from './navbar.styles'

import {
  selectSingleLocation,
  selectSelectedLocationDetail,
} from '../../redux/reducers/location/location.selectors'
import { selectSearchedData } from '../../redux/reducers/search/search.selectors'
import { searchFetchAsync } from '../../redux/reducers/search/search.action'
import SearchDropdown from '../Search  Dropdown/searchDropdown.component'
import { isSingleLocation } from '../../redux/reducers/location/location.action'
import ArrayListSidebar from '../utils/searchArrayList.component'

function Navbar({
  fetchSearch,
  isSingleLocation,
  searchData,
  isSingleLocationState,
}) {
  const [inputState, setInputState] = React.useState('')
  const [searchDropdownState, setsearchDropdownState] = React.useState(false)
  const handleChange = (evt) => {
    setInputState(evt.target.value)
    setsearchDropdownState(true)
  }
  const handleSearchSubmit = (evt) => {
    evt.preventDefault()
    fetchSearch(inputState)
  }
  const history = useHistory()
  return (
    <div>
      <AppBar position="static">
        <CustomToolbar>
          <CustomTypography variant="h6" noWrap>
            Pitch
          </CustomTypography>
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
                  if (!isSingleLocationState) {
                    isSingleLocation()
                    history.push('/')
                  }
                }}
              />
            </CustomForm>
            {searchDropdownState ? (
              <SearchDropdown
                handleClose={() => setsearchDropdownState(false)}
              />
            ) : null}
          </SearchWrapper>
          {searchData ? (
            <CustomButton
              onClick={() => {
                isSingleLocation()
                !isSingleLocationState
                  ? history.push('/')
                  : history.push('/all')
              }}
              color="primary"
              variant="contained"
              fullWidth={true}
            >
              {isSingleLocationState ? `See all ATM's` : 'Go Back'}
            </CustomButton>
          ) : null}
        </CustomToolbar>
        {!isSingleLocationState ? (
          <SidebarWrapper>
            <ArrayListSidebar handleClose={() => ''} />
          </SidebarWrapper>
        ) : null}
      </AppBar>
    </div>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
