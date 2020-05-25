import React from 'react'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { createStructuredSelector } from 'reselect'
import { useHistory } from 'react-router-dom'

import {
  selectFilterDisplayName,
  selectNoDataFound,
} from '../../redux/reducers/search/search.selectors'
import { selectSingleLocation } from '../../redux/reducers/location/location.selectors'
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

import { SmallWrapper } from './searchArrayList.styles'

function ArrayList({
  handleClose,
  searchedArrayData,
  selectLocation,
  openSnackBar,
  isSingleState,
  setSingleLocation,
  setHoverItem,
}) {
  const history = useHistory()

  const handleClick = (item) => {
    selectLocation(item)
    handleClose()
    openSnackBar()
    if (!isSingleState) {
      setSingleLocation()
      history.push('/')
    }
  }
  const handleMouse = (item) => {
    if (!isSingleState) {
      return setHoverItem(item)
    }
  }
  return (
    <>
      <List component="nav" aria-label="search results">
        {searchedArrayData !== null ? (
          searchedArrayData.map((item) =>
            item.type === 'atm' || item.type === 'bank' ? (
              <React.Fragment key={uuid()}>
                <ListItem
                  button
                  onClick={() => handleClick(item)}
                  key={item.place_id}
                  onMouseEnter={() => handleMouse(item)}
                  onMouseLeave={() => handleMouse(null)}
                >
                  <SmallWrapper type={item.type}>
                    <small> {item.type.toUpperCase()}</small>
                  </SmallWrapper>
                  <ListItemText secondary={item.mAddress} />
                </ListItem>
                {searchedArrayData.length !== 1 ? <Divider /> : null}
              </React.Fragment>
            ) : null
          )
        ) : (
          <ListItem>
            <ListItemText style={{ color: 'black' }}>
              No matching bank, branch or ATM found
            </ListItemText>
          </ListItem>
        )}
      </List>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  searchedArrayData: selectFilterDisplayName,
  isSingleState: selectSingleLocation,
  noDataFound: selectNoDataFound,
})

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationDetails) =>
    dispatch(selectedLocation(locationDetails)),
  openSnackBar: () => dispatch(snackBar(true)),
  setSingleLocation: () => dispatch(isSingleLocation()),
  setHoverItem: (item) => dispatch(setHoverItem(item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ArrayList)
