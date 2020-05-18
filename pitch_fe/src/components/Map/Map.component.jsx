import React from 'react'
import { connect } from 'react-redux'

import SingleLocation from './singleLocationView/singleLocation.component'
import AllLocation from './AllLocationView/AllLocation.component'

function MapComponent({ singleLocation }) {
  return <>{singleLocation ? <SingleLocation /> : <AllLocation />}</>
}

const mapStateToProps = (state) => ({
  singleLocation: state.location.isSingleLocation,
})
export default connect(mapStateToProps)(MapComponent)
