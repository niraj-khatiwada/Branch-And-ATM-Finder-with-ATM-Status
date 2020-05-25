import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectSelectedLocationDetail } from '../../../../../redux/reducers/location/location.selectors'

import branch from '../../icons/branch.png'
import atm from '../../icons/atm.png'

import HasOrNot from './hasOrNot.component'

import {
  BranchWrapper,
  IconAndTitle,
  Image,
  Heading,
  H4,
  Item,
  ItemHeading,
  P,
} from '../Content.styles'

function Branch({ selectedLocation }) {
  return (
    <BranchWrapper>
      <IconAndTitle>
        <Image
          src={selectedLocation.type === 'bank' ? branch : atm}
          alt="icon"
        />
        <Heading>{selectedLocation.type === 'bank' ? 'Branch' : 'ATM'}</Heading>
      </IconAndTitle>
      <H4>{selectedLocation.mAddress}</H4>
      <HasOrNot category="address" item="suburb" name="Suburb" />
      <HasOrNot category="address" item="road" name="Street" />
      <HasOrNot category="address" item="neighbourhood" name="Neighbourhood" />
      <HasOrNot category="address" item="city" name="City" />
      <HasOrNot category="address" item="postcode" name="Postcode" />

      {selectedLocation.extratags ? (
        <>
          <HasOrNot category="extratags" item="contact" name="Contact" />
          <HasOrNot
            category="extratags"
            item="opening_hours"
            name="Opening Hours"
          />
        </>
      ) : null}
    </BranchWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedLocation: selectSelectedLocationDetail,
})

export default connect(mapStateToProps)(Branch)
