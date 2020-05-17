import React from 'react'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { selectSearchedData } from '../../redux/reducers/search/search.selectors'

function MapComponent({ selectedLocationData, allSearchedLocationArray }) {
  const [popup, setPopup] = React.useState(false)
  const [selectedData, setSelectedData] = React.useState(selectedLocationData)
  return (
    <div>
      <Map center={[28.1083929, 84.0917139]} zoom={50}>
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
            <Popup position={[parseFloat(item.lat), parseFloat(item.lon)]}>
              <div>
                <h3>{item.mAddress}</h3>
              </div>
            </Popup>
          </>
        ))}
      </Map>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedLocationData: state.location.selectedLocationDetail,
  allSearchedLocationArray: selectSearchedData(state),
})

export default connect(mapStateToProps)(MapComponent)
