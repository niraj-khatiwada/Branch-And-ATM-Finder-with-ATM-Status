import React from 'react'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { selectSearchedData } from '../../redux/reducers/search/search.selectors'
import { selectSelectedLocationDetail } from '../../redux/reducers/location/location.selectors'
import { createStructuredSelector } from 'reselect'

function MapComponent({ selectedLocationData, allSearchedLocationArray }) {
  const [popup, setPopup] = React.useState(false)
  const [selectedData, setSelectedData] = React.useState(selectedLocationData)
  return (
    <div>
      <Map
        center={[28.1083929, 84.0917139]}
        zoomControl={true}
        zoom={50}
        onclick={() => setSelectedData(allSearchedLocationArray)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedData.map((item) => (
          <>
            <Marker
              position={[parseFloat(item.lat), parseFloat(item.lon)]}
              onclick={() => setPopup(!popup)}
              key={item.place_id}
            />
            {popup ? (
              <Popup position={[parseFloat(item.lat), parseFloat(item.lon)]}>
                <div>
                  <h3>{item.mAddress}</h3>
                </div>
              </Popup>
            ) : null}
          </>
        ))}
      </Map>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedLocationData: selectSelectedLocationDetail,
  allSearchedLocationArray: selectSearchedData,
})

export default connect(mapStateToProps)(MapComponent)
