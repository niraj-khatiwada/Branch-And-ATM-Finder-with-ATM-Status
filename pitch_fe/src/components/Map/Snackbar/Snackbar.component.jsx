import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  selectSelectedLocationDBID,
  selectIsStoreToDBFetching,
} from '../../../redux/reducers/search/search.selectors'
import {
  CustomSnackbar,
  SnackBarContent,
  ButtonWrapper,
} from './Snackbar.styles'
import {
  snackBar,
  getLocationDetailFromDBAsync,
} from '../../../redux/reducers/location/location.action'
import {
  selectSnackBarState,
  selectSelectedLocationDetail,
} from '../../../redux/reducers/location/location.selectors'

import Content from './SnackBar Content/Content.component'

import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

function SnackBar({
  snackBarState,
  handleSnackBar,
  selectedLocation,
  fetchLocationDetails,
  getDBID,
  isStoreToDBStillFetching,
}) {
  React.useEffect(() => {
    if (selectedLocation.place_id !== 235452178 && !isStoreToDBStillFetching) {
      if (getDBID) {
        fetchLocationDetails(getDBID)
      }
    }
  }, [selectedLocation, isStoreToDBStillFetching])
  return (
    <CustomSnackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      children={
        selectedLocation ? (
          <SnackBarContent>
            <ButtonWrapper>
              <IconButton onClick={() => handleSnackBar()} size="small">
                <CloseIcon />
              </IconButton>
            </ButtonWrapper>
            <Content />
          </SnackBarContent>
        ) : null
      }
      open={snackBarState}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  snackBarState: selectSnackBarState,
  selectedLocation: selectSelectedLocationDetail,
  getDBID: selectSelectedLocationDBID,
  isStoreToDBStillFetching: selectIsStoreToDBFetching,
})

const mapDispatchToProps = (dispatch) => ({
  handleSnackBar: () => dispatch(snackBar(false)),
  fetchLocationDetails: (id) => dispatch(getLocationDetailFromDBAsync(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SnackBar)
