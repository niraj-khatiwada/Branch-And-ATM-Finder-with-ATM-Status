import React from 'react'
import { connect } from 'react-redux'

import SingleLocation from './singleLocationView/singleLocation.component'
import AllLocation from './AllLocationView/AllLocation.component'
import { MapWrapper, CustomSnackbar } from './Map.styles'
import { snackBar } from '../../redux/reducers/location/location.action'

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

const mapStateToProps = (state) => ({
  singleLocation: state.location.isSingleLocation,
  snackBarState: state.location.snackBarState,
  selectedLocation: state.location.selectedLocationDetail,
})

const mapDispatchToProps = (dispatch) => ({
  handleSnackBar: () => dispatch(snackBar(false)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)
