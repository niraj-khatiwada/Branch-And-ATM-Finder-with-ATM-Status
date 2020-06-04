import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  selectSuccessFromDB,
  selectIsAllDown,
  selectIsRetrieveFromDBStillFetching,
  selectMinDistanceATMDetails,
} from '../../../../../redux/reducers/location/location.selectors'
import ATMLabel from '../../utils/ATMLabel.component'

import {
  fetchMinDistanceDetailFromDBAsync,
  fetchMinDistanceDetailFromDBSuccess,
  selectedLocation,
} from '../../../../../redux/reducers/location/location.action'

import {
  selectDistance,
  selectDBResults,
  selectFilterDisplayName,
} from '../../../../../redux/reducers/search/search.selectors'

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
  CustomButton,
} from '../Content.styles'

import atm from '../../icons/atm.png'
import atm_alt from '../../icons/atm_alt.png'

function ATM({
  dataFromDB,
  type,
  isAllDown,
  sortedDistanceArray,
  fetchMinDistanceDetail,
  fetchMinDistanceDetailFromDBSuccess,
  selectIsRetrieveFromDBStillFetching,
  minDistanceAtmDetails,
  DBResults,
  searchedArray,
  selectSingleLocation,
}) {
  React.useEffect(() => {
    if (isAllDown && !selectIsRetrieveFromDBStillFetching) {
      fetchMinDistanceDetail(sortedDistanceArray, DBResults)
    } else {
      fetchMinDistanceDetailFromDBSuccess()
    }
  }, [isAllDown, selectIsRetrieveFromDBStillFetching])

  const handleClick = (evt) => {
    let value
    minDistanceAtmDetails.atm[0].branch
      ? (value = minDistanceAtmDetails.atm[0].branch.name)
      : (value = minDistanceAtmDetails.atm[0].address)
    const a = searchedArray.find((item) => item.display_name === value)
    if (a) {
      selectSingleLocation(a)
    }
  }
  return (
    <ATMWrapper>
      {type === 'bank' || type === 'atm' ? (
        <IconAndTitle>
          <>
            <Image src={atm} alt="atm-icon" />
            <Heading isAllDown={isAllDown}>
              ATM Status {isAllDown ? "(All ATM's are down)" : null}
            </Heading>
          </>
        </IconAndTitle>
      ) : (
        <>
          <IconAndTitle>
            <Image src={atm} />
            <Heading>
              Nearest ATM{' '}
              <CustomButton
                color="secondary"
                size="small"
                onClick={handleClick}
              >
                See Details
              </CustomButton>
            </Heading>
          </IconAndTitle>
          <Item>
            <P>
              {minDistanceAtmDetails !== null &&
              minDistanceAtmDetails.atm.length !== 0
                ? minDistanceAtmDetails.atm[0].branch
                  ? minDistanceAtmDetails.atm[0].branch.name
                  : minDistanceAtmDetails.atm[0].address
                : null}
            </P>
          </Item>
        </>
      )}
      {type === 'bank' && type !== 'atm' ? (
        <Item>
          <ItemHeading>Total ATM's:</ItemHeading>
          <P>{dataFromDB.atm.length}</P>
        </Item>
      ) : minDistanceAtmDetails !== null &&
        minDistanceAtmDetails.atm.length !== 0 ? (
        <Item>
          <ItemHeading>Total ATM's:</ItemHeading>
          <P>{minDistanceAtmDetails.atm.length}</P>
        </Item>
      ) : null}
      <ATMGrid>
        {type === 'bank' || type === 'atm'
          ? dataFromDB.atm.map((a) => (
              <ATMImageWrapper>
                <ATMImage src={atm_alt} atmStatus={a.status} />
              </ATMImageWrapper>
            ))
          : minDistanceAtmDetails
          ? minDistanceAtmDetails.atm.map((atm) => (
              <ATMImageWrapper>
                <ATMImage src={atm_alt} atmStatus={atm.status} />
              </ATMImageWrapper>
            ))
          : null}
      </ATMGrid>
      {type === 'bank' || type === 'atm' ? <ATMLabel /> : null}
    </ATMWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  dataFromDB: selectSuccessFromDB,
  isAllDown: selectIsAllDown,
  sortedDistanceArray: selectDistance,
  DBResults: selectDBResults,
  selectIsRetrieveFromDBStillFetching: selectIsRetrieveFromDBStillFetching,
  minDistanceAtmDetails: selectMinDistanceATMDetails,
  searchedArray: selectFilterDisplayName,
})

const mapDispatchToProps = (dispatch) => ({
  fetchMinDistanceDetail: (a, b) =>
    dispatch(fetchMinDistanceDetailFromDBAsync(a, b)),
  fetchMinDistanceDetailFromDBSuccess: () =>
    dispatch(fetchMinDistanceDetailFromDBSuccess(null)),
  selectSingleLocation: (item) => dispatch(selectedLocation(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ATM)
