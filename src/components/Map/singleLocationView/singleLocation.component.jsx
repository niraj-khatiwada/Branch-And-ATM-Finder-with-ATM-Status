import React from 'react'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'
import { createStructuredSelector } from 'reselect'
import { Map, Marker } from 'react-leaflet'
import { selectSelectedLocationDetail } from '../../../redux/reducers/location/location.selectors'
import {
  selectFilterDisplayName,
  selectZIndex,
} from '../../../redux/reducers/search/search.selectors'
import { customIcon, defaultIcon } from '../../../icons/customMarkerIcon'
import TileLayerComponent from '../utils/tileLayer.utils'
import PopupComponent from '../utils/popup.utils'
import Snackbar from '../Snackbar/Snackbar.component'

const pageTransition = {
  in: {
    scale: 1,
  },
  out: {
    scale: 0.9,
  },
}

function SingleLocation({ selectedLocationData, allLocationArray, mapZIndex }) {
  const [popup, setPopup] = React.useState(false)
  const [popupOfArray, setPopupOfArray] = React.useState({
    item: null,
    isOpen: false,
  })
  const coordinates = [
    parseFloat(selectedLocationData.lat),
    parseFloat(selectedLocationData.lon),
  ]

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
        center={coordinates}
        zoom={50}
        animate={true}
        duration={2}
        easeLinearity={0.5}
        style={{ zIndex: mapZIndex }}
      >
        <TileLayerComponent />
        <motion.div
          animate={{ y: 0 }}
          initial={{ y: '100vh' }}
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 0.2,
            delay: 0.2,
          }}
        >
          <Snackbar />
        </motion.div>
        <>
          <Marker
            icon={customIcon}
            position={coordinates}
            onclick={() => setPopup(!popup)}
            key={selectedLocationData.place_id}
          />
          {popup ? <PopupComponent item={selectedLocationData} /> : null}
        </>
        {allLocationArray !== null
          ? allLocationArray
              .filter((item) => selectedLocationData.place_id !== item.place_id)
              .map((item) => (
                <Marker
                  icon={defaultIcon}
                  position={[parseFloat(item.lat), parseFloat(item.lon)]}
                  onClick={() => {
                    popupOfArray.item === null
                      ? setPopupOfArray({ item, isOpen: true })
                      : setPopupOfArray({
                          item,
                          isOpen: !popupOfArray.isOpen,
                        })
                  }}
                  key={item.place_id}
                />
              ))
          : null}
        {allLocationArray !== null
          ? allLocationArray.map((item) => {
              if (
                popupOfArray.item !== null &&
                item.place_id === popupOfArray.item.place_id
              )
                return popupOfArray.isOpen ? (
                  <PopupComponent
                    item={item}
                    key={item.place_id}
                    closePopup={() =>
                      setPopupOfArray({ ...popupOfArray, isOpen: false })
                    }
                  />
                ) : null
            })
          : null}
      </Map>
    </motion.div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedLocationData: selectSelectedLocationDetail,
  allLocationArray: selectFilterDisplayName,
  mapZIndex: selectZIndex,
})

export default connect(mapStateToProps)(SingleLocation)
