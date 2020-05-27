import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  selectSuccessFromDB,
  selectIsAllDown,
} from '../../../../../redux/reducers/location/location.selectors'
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

function ATM({ dataFromDB, type, isAllDown }) {
  return (
    <ATMWrapper>
      <IconAndTitle>
        {type === 'bank' || type === 'atm' ? (
          <>
            {type === 'bank' ? <Image src={atm} alt="atm-icon" /> : null}
            <Heading isAllDown={isAllDown}>
              ATM Status {isAllDown ? "(All ATM's are down)" : null}
            </Heading>
          </>
        ) : (
          <>
            <Heading>Nearest ATM</Heading>
          </>
        )}
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
  isAllDown: selectIsAllDown,
})

export default connect(mapStateToProps)(ATM)
