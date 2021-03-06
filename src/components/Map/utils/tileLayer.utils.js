import React from 'react'
import { TileLayer } from 'react-leaflet'

export default function TileLayerComponent() {
  return (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
  )
}
