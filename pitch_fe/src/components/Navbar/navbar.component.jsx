import React from 'react'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import MenuIcon from '@material-ui/icons/Menu'

import { SearchWrapper } from './navbar.styles'
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
              <InputBase
                id="searchInput"
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  padding: '0 1rem',
                  borderRadius: '0.5rem',
                  height: '3rem',
                }}
                value={inputState}
                onChange={handleChange}
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
