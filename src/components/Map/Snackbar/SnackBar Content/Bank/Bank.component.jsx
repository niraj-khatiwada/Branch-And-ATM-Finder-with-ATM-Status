import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectSuccessFromDB } from '../../../../../redux/reducers/location/location.selectors'
import {
  BankWrapper,
  IconAndTitle,
  Image,
  H4,
  Item,
  ItemHeading,
  P,
  Heading,
} from '../Content.styles'

import bank from '../../icons/bank.png'

function Bank({ dataFromDB }) {
  return (
    <BankWrapper>
      <IconAndTitle>
        <Image src={bank} alt="bank-icon" />
        <Heading>Parent</Heading>
      </IconAndTitle>
      <H4>{dataFromDB.parent}</H4>
      <Item>
        <ItemHeading>Headquarter: </ItemHeading>
        <P>{dataFromDB.headquarter}</P>
      </Item>
      {dataFromDB.website ? (
        <Item>
          <ItemHeading>Website:</ItemHeading>
          <a href={dataFromDB.website}> {dataFromDB.website}</a>
        </Item>
      ) : null}
      {dataFromDB.contact_number ? (
        <Item>
          <ItemHeading>Contact:</ItemHeading>
          <P>
            {dataFromDB.contact_number.reduce(
              (accumulator, currVal) => accumulator + ', ' + currVal
            )}
          </P>
        </Item>
      ) : null}
    </BankWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  dataFromDB: selectSuccessFromDB,
})

export default connect(mapStateToProps)(Bank)
