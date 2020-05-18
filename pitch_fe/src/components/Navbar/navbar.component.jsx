import React from 'react'
import { connect } from 'react-redux'

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

import { SearchWrapper, CustomInputBase, SidebarWrapper } from './navbar.styles'
import { searchFetchAsync } from '../../redux/reducers/search/search.action'
import SearchDropdown from '../Search  Dropdown/searchDropdown.component'
import { isSingleLocation } from '../../redux/reducers/location/location.action'
import ArrayListSidebar from '../Map/AllLocationView/AllLocationSidebar.component'

function Navbar({
  fetchSearch,
  isSingleLocation,
  searchData,
  selectedLocation,
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
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" noWrap>
              Pitch
            </Typography>
          </div>
          <SearchWrapper>
            <form style={{ width: '100%' }} onSubmit={handleSearchSubmit}>
              <CustomInputBase
                id="searchInput"
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                style={{}}
                value={inputState}
                onChange={handleChange}
                onFocus={() => {
                  setsearchDropdownState(true)
                  if (!isSingleLocationState) {
                    isSingleLocation()
                  }
                }}
              />
            </form>
            {searchDropdownState ? (
              <SearchDropdown
                handleClose={() => setsearchDropdownState(false)}
              />
            ) : null}
          </SearchWrapper>
          <div
            style={{
              width: '10rem',
              height: '3rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {searchData ? (
              <Button
                onClick={() => isSingleLocation()}
                color="primary"
                variant="contained"
                fullWidth={true}
              >
                {isSingleLocationState ? `See all branches` : 'Go Back'}
              </Button>
            ) : null}
          </div>
        </Toolbar>
        {!isSingleLocationState ? (
          <SidebarWrapper>
            <ArrayListSidebar />
          </SidebarWrapper>
        ) : null}
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => ({
  searchData: state.search.searchedData,
  selectedLocation: state.location.selectedLocationDetail,
  isSingleLocationState: state.location.isSingleLocation,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (searchQuery) => dispatch(searchFetchAsync(searchQuery)),
  isSingleLocation: () => dispatch(isSingleLocation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
