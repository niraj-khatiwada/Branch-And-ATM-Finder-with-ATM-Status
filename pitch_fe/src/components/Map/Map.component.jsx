import React from 'react'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

function MapComponent({ coordinates }) {
  return (
    <div>
      <Map center={coordinates} zoom={50}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates} />
      </Map>
    </div>
  )
}

const mapStateToProps = (state) => ({
  coordinates: state.location.selectedLocation,
})

export default connect(mapStateToProps)(MapComponent)
