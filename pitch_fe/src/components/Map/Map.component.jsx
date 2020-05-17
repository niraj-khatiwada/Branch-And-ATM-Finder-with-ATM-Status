import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

export default function MapComponent() {
  const coord = [27.7098909, 85.3148715]
  return (
    <div>
      <Map center={coord} zoom={50}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coord} />
      </Map>
    </div>
  )
}
