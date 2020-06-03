import React from 'react'
import { connect } from 'react-redux'
import { Map, Marker } from 'react-leaflet'
import { createStructuredSelector } from 'reselect'
import { motion } from 'framer-motion'

import { selectFilterDisplayName } from '../../../redux/reducers/search/search.selectors'
import {
  selecthoverItem,
  selectSelectedLocationDetail,
} from '../../../redux/reducers/location/location.selectors'
import { defaultIcon, customIcon } from '../../../icons/customMarkerIcon'
import PopupComponent from '../utils/popup.utils'
import TileLayerComponent from '../utils/tileLayer.utils'

const pageTransition = {
  in: {
    scale: 1,
  },
  out: {
    scale: 0.9,
  },
}

function AllLocation({
  allSearchedLocationArray,
  hoverItem,
  selectedLocation,
}) {
  const [popup, setPopup] = React.useState({ item: null, isOpen: false })
  return (
    <motion.div
      variants={pageTransition}
      animate="in"
      exit="out"
      initial="out"
      transition={{
        transition: 'linear',
      }}
    >
      <Map
        center={[27.6805555556, 85.3875]}
        zoom={13}
        animate={true}
        duration={2}
        easeLinearity={0.5}
      >
        <TileLayerComponent />
        {allSearchedLocationArray !== null
          ? allSearchedLocationArray.map((item) => (
              <Marker
                position={[parseFloat(item.lat), parseFloat(item.lon)]}
                onClick={() => {
                  popup.item === null
                    ? setPopup({ item, isOpen: true })
                    : setPopup({ item, isOpen: !popup.isOpen })
                }}
                key={item.place_id}
                icon={
                  item.place_id === selectedLocation.place_id
                    ? customIcon
                    : defaultIcon
                }
              />
            ))
          : null}
        {allSearchedLocationArray !== null
          ? allSearchedLocationArray.map((item) =>
              hoverItem === null ? (
                popup.item !== null && popup.item.place_id === item.place_id ? (
                  popup.isOpen ? (
                    <PopupComponent item={item} key={item.place_id} />
                  ) : null
                ) : null
              ) : hoverItem.place_id === item.place_id ? (
                <PopupComponent item={hoverItem} key={hoverItem.place_id} />
              ) : null
            )
          : null}
      </Map>
    </motion.div>
  )
}

const mapStateToProps = createStructuredSelector({
  allSearchedLocationArray: selectFilterDisplayName,
  hoverItem: selecthoverItem,
  selectedLocation: selectSelectedLocationDetail,
})

export default connect(mapStateToProps)(AllLocation)
