import React from 'react'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { selectFilterDisplayName } from '../../redux/reducers/search/search.selectors'
import { selectedLocation } from '../../redux/reducers/location/location.action'
import { Dropdown } from './searchDropdown.styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

function SearchDropdown({ searchedDataArray, selectLocation, handleClose }) {
  React.useEffect(() => {
    const dropdown = document.getElementById('searchDropdown')
    const searchInput = document.getElementById('searchInput')
    document.addEventListener('click', (evt) => {
      if (!dropdown.contains(evt.target) && !searchInput.contains(evt.target)) {
        return handleClose()
      }
    })
  })
  return (
    <Dropdown id="searchDropdown">
      {searchedDataArray.map((item) => (
        <List component="nav" aria-label="search results" key={uuid()}>
          <ListItem
            button
            onClick={(evt) => {
              evt.stopPropagation()
              selectLocation(item.coordinates)
            }}
          >
            <ListItemText secondary={item.mAddress} />
          </ListItem>
          <Divider />
        </List>
      ))}
    </Dropdown>
  )
}

const mapStateToProps = (state) => ({
  searchedDataArray: selectFilterDisplayName(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (location) => dispatch(selectedLocation(location)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchDropdown)
