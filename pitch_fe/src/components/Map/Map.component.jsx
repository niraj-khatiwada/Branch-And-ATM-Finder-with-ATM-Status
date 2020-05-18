import React from 'react'
import { connect } from 'react-redux'

import SingleLocation from './singleLocationView/singleLocation.component'
import AllLocation from './AllLocationView/AllLocation.component'
import { MapWrapper } from './Map.styles'

import { Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

function MapComponent({ singleLocation, snackBarState }) {
  return (
    <MapWrapper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        action={<h1>Hello world</h1>}
        open={snackBarState}
      />
      {singleLocation ? <SingleLocation /> : <AllLocation />}
    </MapWrapper>
  )
}

const mapStateToProps = (state) => ({
  singleLocation: state.location.isSingleLocation,
  snackBarState: state.location.snackBarState,
})

export default connect(mapStateToProps)(MapComponent)
