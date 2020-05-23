import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  selectSingleLocation,
  selectSelectedLocationDetail,
} from '../../../redux/reducers/location/location.selectors'

import { Popup } from 'react-leaflet'
import { CustomButton } from '../../Navbar/navbar.styles'
import { selectedLocation } from '../../../redux/reducers/location/location.action'

function PopupComponent({
  item,
  selectLocation,
  isSingleLocationState,
  selectedLocation,
  closePopup,
}) {
  return (
    <Popup position={[parseFloat(item.lat), parseFloat(item.lon)]}>
      <div>
        <h3>{item.mAddress}</h3>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          {isSingleLocationState &&
          selectedLocation.place_id !== item.place_id ? (
            <CustomButton
              onClick={() => {
                closePopup()
                selectLocation(item)
              }}
            >
              See Details
            </CustomButton>
          ) : null}
        </div>
      </div>
    </Popup>
  )
}

const mapstateToProps = createStructuredSelector({
  isSingleLocationState: selectSingleLocation,
  selectedLocation: selectSelectedLocationDetail,
})
const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationDetails) =>
    dispatch(selectedLocation(locationDetails)),
})

export default connect(mapstateToProps, mapDispatchToProps)(PopupComponent)
