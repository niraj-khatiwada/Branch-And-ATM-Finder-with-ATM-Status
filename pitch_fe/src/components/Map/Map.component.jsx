import React from 'react'

import SingleLocation from './singleLocationView/singleLocation.component'
import AllLocation from './AllLocationView/AllLocation.component'

function MapComponent() {
  const [isSingleLocation, setIsLocation] = React.useState(true)
  return <>{isSingleLocation ? <SingleLocation /> : <AllLocation />}</>
}

export default MapComponent
