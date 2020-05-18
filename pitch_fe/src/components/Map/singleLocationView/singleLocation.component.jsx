import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { selectSelectedLocationDetail } from '../../../redux/reducers/location/location.selectors'

function SingleLocation({ selectedLocationData }) {
  const [popup, setPopup] = React.useState(false)
  const coordinates = [
    parseFloat(selectedLocationData.lat),
    parseFloat(selectedLocationData.lon),
  ]
  return (
    <div>
      <Map
        center={coordinates}
        zoom={50}
        animate={true}
        duration={2}
        easeLinearity={0.5}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <>
          <Marker
            position={coordinates}
            onclick={() => setPopup(!popup)}
            key={selectedLocationData.place_id}
          />
          {popup ? (
            <Popup position={coordinates}>
              <div>
                <h3>{selectedLocationData.mAddress}</h3>
              </div>
            </Popup>
          ) : null}
        </>
      </Map>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedLocationData: selectSelectedLocationDetail,
})

export default connect(mapStateToProps)(SingleLocation)
