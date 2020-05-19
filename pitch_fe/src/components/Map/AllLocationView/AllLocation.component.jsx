import React from 'react'
import { connect } from 'react-redux'
import { Map, Marker } from 'react-leaflet'
import { createStructuredSelector } from 'reselect'

import { selectFilterDisplayName } from '../../../redux/reducers/search/search.selectors'
import {
  selecthoverItem,
  selectSelectedLocationDetail,
} from '../../../redux/reducers/location/location.selectors'
import { defaultIcon, customIcon } from '../../../icons/customMarkerIcon'
import PopupComponent from '../utils/popup.utils'
import TileLayerComponent from '../utils/tileLayer.utils'

function AllLocation({
  allSearchedLocationArray,
  hoverItem,
  selectedLocation,
}) {
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
        <TileLayerComponent />
        {allSearchedLocationArray.map((item) => (
          <Marker
            position={[parseFloat(item.lat), parseFloat(item.lon)]}
            onClick={() => {
              if (popup.item === null) {
                setPopup({ item })
              } else {
                setPopup({ item: null })
                setPopup({ item })
              }
            }}
            key={item.place_id}
            icon={
              item.place_id === selectedLocation.place_id
                ? customIcon
                : defaultIcon
            }
          />
        ))}
        {allSearchedLocationArray.map((item) =>
          hoverItem === null ? (
            popup.item !== null && popup.item.place_id === item.place_id ? (
              <PopupComponent item={item} key={item.place_id} />
            ) : null
          ) : hoverItem.place_id === item.place_id ? (
            <PopupComponent item={hoverItem} key={hoverItem.place_id} />
          ) : null
        )}
      </Map>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  allSearchedLocationArray: selectFilterDisplayName,
  hoverItem: selecthoverItem,
  selectedLocation: selectSelectedLocationDetail,
})

export default connect(mapStateToProps)(AllLocation)
