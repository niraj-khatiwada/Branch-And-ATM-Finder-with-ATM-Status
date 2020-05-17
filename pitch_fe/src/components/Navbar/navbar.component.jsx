import React from 'react'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

import { SearchWrapper, CustomInputBase } from './navbar.styles'
import { searchFetchAsync } from '../../redux/reducers/search/search.action'
import SearchDropdown from '../Search  Dropdown/searchDropdown.component'

function Navbar({ fetchSearch }) {
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
            <h1>Notif</h1>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (searchQuery) => dispatch(searchFetchAsync(searchQuery)),
})

export default connect(null, mapDispatchToProps)(Navbar)
