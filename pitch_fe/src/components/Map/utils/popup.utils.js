import React from 'react'
import { Popup } from 'react-leaflet'

export default function PopupComponent({ item }) {
  return (
    <Popup position={[parseFloat(item.lat), parseFloat(item.lon)]}>
      <div>
        <h3>{item.mAddress}</h3>
      </div>
    </Popup>
  )
}
