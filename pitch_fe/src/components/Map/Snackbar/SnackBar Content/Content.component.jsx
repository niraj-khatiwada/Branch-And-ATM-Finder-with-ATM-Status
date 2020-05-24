import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  ContentWrapper,
  BranchWrapper,
  IconAndTitle,
  Image,
  Heading,
  BankWrapper,
  ATMWrapper,
  ATMGrid,
  ATMImage,
  ATMImageWrapper,
  ItemHeading,
  Item,
  P,
  H4,
} from './Content.styles'

import { WithSpinner } from '../../../HOC withSpinner/withSpinner.styles'
import { selectIsStoreToDBFetching } from '../../../../redux/reducers/search/search.selectors'

import {
  selectSuccessFromDB,
  selectSelectedLocationDetail,
  selectIsRetrieveFromDBStillFetching,
} from '../../../../redux/reducers/location/location.selectors'

import ATMLabel from '../utils/ATMLabel.component'

import branch from '../icons/branch.png'
import bank from '../icons/bank.png'
import atm from '../icons/atm.png'
import atm_alt from '../icons/atm_alt.png'

function Content({
  dataFromDB,
  selectedLocation,
  isDBStillFetching,
  isRetrieveFromDBStillFetching,
}) {
  return (
    <ContentWrapper>
      <BranchWrapper>
        <IconAndTitle>
          <Image
            src={selectedLocation.type === 'bank' ? branch : atm}
            alt="icon"
          />
          <Heading>
            {selectedLocation.type === 'bank' ? 'Branch' : 'ATM'}
          </Heading>
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
      {dataFromDB ? (
        <>
          {selectedLocation.type === 'bank' &&
          !isRetrieveFromDBStillFetching ? (
            dataFromDB.atm.length !== 0 ? (
              <ATMWrapper>
                <IconAndTitle>
                  <Image src={atm} alt="atm-icon" />
                  <Heading>ATM Status</Heading>
                </IconAndTitle>
                <Item>
                  <ItemHeading>Total ATM's:</ItemHeading>
                  <P>{dataFromDB.atm.length}</P>
                </Item>
                <ATMGrid>
                  {dataFromDB.atm.map((a) => (
                    <ATMImageWrapper>
                      <ATMImage src={atm_alt} atmStatus={a.status} />
                    </ATMImageWrapper>
                  ))}
                </ATMGrid>
                <ATMLabel />
              </ATMWrapper>
            ) : null
          ) : dataFromDB.atm ? (
            <ATMWrapper>
              <Heading>ATM Status</Heading>
              <ATMGrid>
                <ATMImageWrapper>
                  <ATMImage src={atm_alt} atmStatus={dataFromDB.atm.status} />
                </ATMImageWrapper>
              </ATMGrid>
              <ATMLabel />
            </ATMWrapper>
          ) : null}
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
        </>
      ) : isDBStillFetching ? (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <WithSpinner color="white" />
        </div>
      ) : null}
    </ContentWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedLocation: selectSelectedLocationDetail,
  dataFromDB: selectSuccessFromDB,
  isDBStillFetching: selectIsStoreToDBFetching,
  isRetrieveFromDBStillFetching: selectIsRetrieveFromDBStillFetching,
})

export default connect(mapStateToProps)(Content)
