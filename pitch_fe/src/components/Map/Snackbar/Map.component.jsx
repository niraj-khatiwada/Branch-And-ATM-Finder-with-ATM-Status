import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useHistory } from 'react-router-dom'

import { CustomSnackbar } from './Map.styles'
import { snackBar } from '../../../redux/reducers/location/location.action'
import {
  selectSnackBarState,
  selectSelectedLocationDetail,
} from '../../../redux/reducers/location/location.selectors'

import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

function SnackBar({ snackBarState, handleSnackBar, selectedLocation }) {
  const history = useHistory()
  return (
    <CustomSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      message={
        selectedLocation ? (
          <div>
            <p>{selectedLocation.mAddress}</p>
          </div>
        ) : null
      }
      action={
        <IconButton onClick={() => handleSnackBar()}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      open={snackBarState}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  snackBarState: selectSnackBarState,
  selectedLocation: selectSelectedLocationDetail,
})

const mapDispatchToProps = (dispatch) => ({
  handleSnackBar: () => dispatch(snackBar(false)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SnackBar)
