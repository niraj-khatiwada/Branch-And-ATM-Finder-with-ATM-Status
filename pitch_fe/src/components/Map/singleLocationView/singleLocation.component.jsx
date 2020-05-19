import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { selectSelectedLocationDetail } from '../../../redux/reducers/location/location.selectors'
import { selectFilterDisplayName } from '../../../redux/reducers/search/search.selectors'

function SingleLocation({ selectedLocationData, allLocationArray }) {
  const [popup, setPopup] = React.useState(false)
  const [popupOfArray, setPopupOfArray] = React.useState({ item: null })
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
        {allLocationArray.length > 1
          ? allLocationArray.map((item) => {
              const coord = [parseFloat(item.lat), parseFloat(item.lon)]
              if (item.place_id !== selectedLocationData.place_id) {
                return (
                  <>
                    <Marker
                      position={coord}
                      onclick={() => setPopupOfArray({ item: item })}
                      key={item.place_id}
                    />
                  </>
                )
              }
            })
          : null}
        {allLocationArray.map((item) => {
          if (
            popupOfArray.item !== null &&
            item.place_id === popupOfArray.item.place_id
          ) {
            return (
              <Popup position={[parseFloat(item.lat), parseFloat(item.lon)]}>
                <div>
                  <h3>{item.mAddress}</h3>
                </div>
              </Popup>
            )
          }
        })}
      </Map>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedLocationData: selectSelectedLocationDetail,
  allLocationArray: selectFilterDisplayName,
})

export default connect(mapStateToProps)(SingleLocation)
