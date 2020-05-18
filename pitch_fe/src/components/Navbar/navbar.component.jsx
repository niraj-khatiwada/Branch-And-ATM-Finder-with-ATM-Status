import React from 'react'
import { connect } from 'react-redux'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

import { SearchWrapper, CustomInputBase } from './navbar.styles'
import { searchFetchAsync } from '../../redux/reducers/search/search.action'
import SearchDropdown from '../Search  Dropdown/searchDropdown.component'
import { isSingleLocation } from '../../redux/reducers/location/location.action'

function Navbar({ fetchSearch, isSingleLocation }) {
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
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
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
                onFocus={() => setsearchDropdownState(true)}
              />
            </form>
            {searchDropdownState ? (
              <SearchDropdown
                handleClose={() => setsearchDropdownState(false)}
              />
            ) : null}
          </SearchWrapper>
          <div>
            <Button onClick={() => isSingleLocation()}>See All</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (searchQuery) => dispatch(searchFetchAsync(searchQuery)),
  isSingleLocation: () => dispatch(isSingleLocation()),
})

export default connect(null, mapDispatchToProps)(Navbar)
