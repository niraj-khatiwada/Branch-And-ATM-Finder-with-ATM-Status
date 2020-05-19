import React from 'react'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { selectFilterDisplayName } from '../../redux/reducers/search/search.selectors'
import {
  selectedLocation,
  setHoverItem,
} from '../../redux/reducers/location/location.action'

import {
  snackBar,
  isSingleLocation,
} from '../../redux/reducers/location/location.action'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

function ArrayList({
  handleClose,
  searchedArrayData,
  selectLocation,
  openSnackBar,
  isSingleState,
  setSingleLocation,
  setHoverItem,
}) {
  return (
    <>
      <List component="nav" aria-label="search results" key={uuid()}>
        {searchedArrayData.map((item) => (
          <>
            <ListItem
              button
              onClick={() => {
                selectLocation(item)
                handleClose()
                openSnackBar()
                if (!isSingleState) {
                  setSingleLocation()
                }
              }}
              key={item.place_id}
              onMouseEnter={() => {
                if (!isSingleState) {
                  return setHoverItem(item)
                }
              }}
              onMouseLeave={() => {
                if (!isSingleState) {
                  return setHoverItem(null)
                }
              }}
            >
              <ListItemText secondary={item.mAddress} />
            </ListItem>
            {searchedArrayData.length !== 1 ? <Divider /> : null}
          </>
        ))}
      </List>
    </>
  )
}

const mapStateToProps = (state) => ({
  searchedArrayData: selectFilterDisplayName(state),
  isSingleState: state.location.isSingleLocation,
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationDetails) =>
    dispatch(selectedLocation(locationDetails)),
  openSnackBar: () => dispatch(snackBar(true)),
  setSingleLocation: () => dispatch(isSingleLocation()),
  setHoverItem: (item) => dispatch(setHoverItem(item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ArrayList)
