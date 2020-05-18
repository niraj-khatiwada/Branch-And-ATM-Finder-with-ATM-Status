import React from 'react'
import { connect } from 'react-redux'

import SingleLocation from './singleLocationView/singleLocation.component'
import AllLocation from './AllLocationView/AllLocation.component'

function MapComponent({ singleLocation }) {
  return (
    <div style={{ position: 'relative', backgroundColor: 'red', zIndex: 10 }}>
      {singleLocation ? <SingleLocation /> : <AllLocation />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  singleLocation: state.location.isSingleLocation,
})
export default connect(mapStateToProps)(MapComponent)
