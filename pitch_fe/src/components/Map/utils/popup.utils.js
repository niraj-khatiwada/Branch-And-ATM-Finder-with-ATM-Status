import React from 'react'
import { connect } from 'react-redux'

import { Popup } from 'react-leaflet'
import { CustomButton } from '../../Navbar/navbar.styles'
import { selectedLocation } from '../../../redux/reducers/location/location.action'

function PopupComponent({ item, selectLocation }) {
  return (
    <Popup position={[parseFloat(item.lat), parseFloat(item.lon)]}>
      <div>
        <h3>{item.mAddress}</h3>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <CustomButton onClick={() => selectLocation(item)}>
            See Details
          </CustomButton>
        </div>
      </div>
    </Popup>
  )
}

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (locationDetails) =>
    dispatch(selectedLocation(locationDetails)),
})

export default connect(null, mapDispatchToProps)(PopupComponent)
