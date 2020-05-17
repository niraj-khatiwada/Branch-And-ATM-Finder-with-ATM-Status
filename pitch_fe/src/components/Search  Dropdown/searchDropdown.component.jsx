import React from 'react'
import { selectFilterDisplayName } from '../../redux/reducers/search.selectors'
import { connect } from 'react-redux'

import { Dropdown } from './searchDropdown.styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

function SearchDropdown({ searchedDataArray, handleBlur }) {
  return (
    <Dropdown>
      {searchedDataArray.map((item) => (
        <List component="nav" aria-label="search results">
          <ListItem button onClick={(evt) => evt.stopPropagation()}>
            <ListItemText secondary={item} />
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

export default connect(mapStateToProps)(SearchDropdown)
