import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectSuccessFromDB } from '../../../../../redux/reducers/location/location.selectors'
import ATMLabel from '../../utils/ATMLabel.component'

import {
  ATMImageWrapper,
  ATMGrid,
  ATMImage,
  ATMWrapper,
  IconAndTitle,
  Image,
  Heading,
  ItemHeading,
  P,
  Item,
} from '../Content.styles'

import atm from '../../icons/atm.png'
import atm_alt from '../../icons/atm_alt.png'

function ATM({ dataFromDB, type }) {
  return (
    <ATMWrapper>
      <IconAndTitle>
        {type === 'bank' ? <Image src={atm} alt="atm-icon" /> : null}
        <Heading>ATM Status</Heading>
      </IconAndTitle>
      {type === 'bank' ? (
        <Item>
          <ItemHeading>Total ATM's:</ItemHeading>
          <P>{dataFromDB.atm.length}</P>
        </Item>
      ) : null}
      <ATMGrid>
        {dataFromDB.atm.map((a) => (
          <ATMImageWrapper>
            <ATMImage src={atm_alt} atmStatus={a.status} />
          </ATMImageWrapper>
        ))}
      </ATMGrid>
      <ATMLabel />
    </ATMWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  dataFromDB: selectSuccessFromDB,
})

export default connect(mapStateToProps)(ATM)
