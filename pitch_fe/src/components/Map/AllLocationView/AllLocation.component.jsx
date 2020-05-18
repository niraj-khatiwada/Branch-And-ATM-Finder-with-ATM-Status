import React from 'react'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import { selectFilterDisplayName } from '../../../redux/reducers/search/search.selectors'

function AllLocation({ allSearchedLocationArray, hoverItem }) {
  const [popup, setPopup] = React.useState({ item: null })
  return (
    <>
      <Map
        center={[27.6805555556, 85.3875]}
        zoom={13}
        animate={true}
        duration={2}
        easeLinearity={0.5}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {allSearchedLocationArray.map((item) => (
          <>
            <Marker
              position={[parseFloat(item.lat), parseFloat(item.lon)]}
              onClick={() => setPopup({ item })}
              key={item.place_id}
            />
          </>
        ))}
        {allSearchedLocationArray.map((item) =>
          hoverItem === null ? (
            popup.item !== null && popup.item.place_id === item.place_id ? (
              <Popup position={[parseFloat(item.lat), parseFloat(item.lon)]}>
                <div>
                  <h3>{item.mAddress}</h3>
                </div>
              </Popup>
            ) : null
          ) : hoverItem.place_id === item.place_id ? (
            <Popup
              position={[parseFloat(hoverItem.lat), parseFloat(hoverItem.lon)]}
            >
              <div>
                <h3>{hoverItem.mAddress}</h3>
              </div>
            </Popup>
          ) : null
        )}
      </Map>
    </>
  )
}

const mapStateToProps = (state) => ({
  allSearchedLocationArray: selectFilterDisplayName(state),
  hoverItem: state.location.hoverItem,
})

export default connect(mapStateToProps)(AllLocation)
