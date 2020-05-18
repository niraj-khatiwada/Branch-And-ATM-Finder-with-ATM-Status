import React from 'react'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { selectFilterDisplayName } from '../../redux/reducers/search/search.selectors'
import { selectedLocation } from '../../redux/reducers/location/location.action'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

function ArrayList({ handleClose, searchedArrayData, selectLocation }) {
  return (
    <>
      <List component="nav" aria-label="search results" key={uuid()}>
        {searchedArrayData.map((item) => (
          <ListItem
            button
            onClick={() => {
              selectLocation(item)
              handleClose()
            }}
            key={item.place_id}
          >
            <ListItemText secondary={item.mAddress} />
            {searchedArrayData.length !== 1 ? <Divider /> : null}
          </ListItem>
        ))}
      </List>
    </>
  )
}

const mapStateToProps = (state) => ({
  searchedArrayData: selectFilterDisplayName(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationDetails) =>
    dispatch(selectedLocation(locationDetails)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ArrayList)
