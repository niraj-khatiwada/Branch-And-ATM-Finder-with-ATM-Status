import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import SingleLocation from './singleLocationView/singleLocation.component'
import AllLocation from './AllLocationView/AllLocation.component'
import { CustomSnackbar } from './Map.styles'
import { snackBar } from '../../redux/reducers/location/location.action'
import {
  selectSingleLocation,
  selectSnackBarState,
  selectSelectedLocationDetail,
} from '../../redux/reducers/location/location.selectors'

import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

function MapComponent({
  singleLocation,
  snackBarState,
  handleSnackBar,
  selectedLocation,
}) {
  return (
    <>
      {singleLocation ? (
        <>
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
          <SingleLocation />{' '}
        </>
      ) : (
        <AllLocation />
      )}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  singleLocation: selectSingleLocation,
  snackBarState: selectSnackBarState,
  selectedLocation: selectSelectedLocationDetail,
})

const mapDispatchToProps = (dispatch) => ({
  handleSnackBar: () => dispatch(snackBar(false)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)
