import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectSelectedLocationDetail } from '../../../../../redux/reducers/location/location.selectors'

import branch from '../../icons/branch.png'
import atm from '../../icons/atm.png'

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
      {selectedLocation.address.postcode ? (
        <>
          {selectedLocation.extratags ? (
            <>
              {selectedLocation.extratags.contact ? (
                <Item>
                  <ItemHeading>Contact: </ItemHeading>
                  <P>{selectedLocation.extratags.contact}</P>
                </Item>
              ) : null}
              {selectedLocation.extratags.opening_hours ? (
                <Item>
                  <ItemHeading>Opening Hours: </ItemHeading>
                  <P>{selectedLocation.extratags.opening_hours}</P>
                </Item>
              ) : null}
            </>
          ) : null}
          <Item>
            <ItemHeading>Postcode: </ItemHeading>
            <P>{selectedLocation.address.postcode}</P>
          </Item>
        </>
      ) : null}
    </BranchWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedLocation: selectSelectedLocationDetail,
})

export default connect(mapStateToProps)(Branch)
