import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  CustomSnackbar,
  SnackBarContent,
  ButtonWrapper,
} from './Snackbar.styles'
import { snackBar } from '../../../redux/reducers/location/location.action'
import {
  selectSnackBarState,
  selectSelectedLocationDetail,
} from '../../../redux/reducers/location/location.selectors'

import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

function SnackBar({ snackBarState, handleSnackBar, selectedLocation }) {
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
            <div style={{ padding: '1rem' }}>
              {' '}
              <p>{selectedLocation.mAddress}</p>
              {selectedLocation.address.postcode
                ? `Postcode: ${selectedLocation.address.postcode}`
                : null}
              <p>
                Website:
                {selectedLocation.extratags.website ? (
                  <a href={selectedLocation.extratags.website}>
                    {selectedLocation.extratags.website}
                  </a>
                ) : null}
              </p>
            </div>
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
})

const mapDispatchToProps = (dispatch) => ({
  handleSnackBar: () => dispatch(snackBar(false)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SnackBar)
