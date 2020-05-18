import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import { selectSearchedData } from '../../../redux/reducers/search/search.selectors'

function AllLocation({ allSearchedLocationArray }) {
  const [popup, setPopup] = React.useState(false)

  return (
    <Map
      center={[21, 84]}
      zoom={10}
      animate={true}
      duration={2}
      easeLinearity={0.5}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {allSearchedLocationArray.map((item) =>
        (<Marker
          position={[parseFloat(item.lat), parseFloat(item.lon)]}
          onclick={() => setPopup(!popup)}
          key={item.place_id}
        />)(
          popup ? (
            <Popup position={[parseFloat(item.lat), parseFloat(item.lon)]}>
              <div>
                <h3>{item.mAddress}</h3>
              </div>
            </Popup>
          ) : null
        )
      )}
    </Map>
  )
}

const mapStateToProps = createStructuredSelector({
  allSearchedLocationArray: selectSearchedData,
})

export default connect(mapStateToProps)(AllLocation)
