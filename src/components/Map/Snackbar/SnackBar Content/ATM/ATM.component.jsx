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
} from '../../../../../redux/reducers/location/location.action'
import {
  selectDistance,
  selectMinDistanceDBID,
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
} from '../Content.styles'

import atm from '../../icons/atm.png'
import atm_alt from '../../icons/atm_alt.png'

function ATM({
  dataFromDB,
  type,
  isAllDown,
  minDistance,
  minDistanceDBID,
  fetchMinDistanceDetail,
  fetchMinDistanceDetailFromDBSuccess,
  selectIsRetrieveFromDBStillFetching,
  minDistanceAtmDetails,
}) {
  React.useEffect(() => {
    if (isAllDown && !selectIsRetrieveFromDBStillFetching) {
      console.log('min distance id is', minDistanceDBID)
      fetchMinDistanceDetail(minDistanceDBID)
    } else {
      fetchMinDistanceDetailFromDBSuccess()
    }
  }, [isAllDown, selectIsRetrieveFromDBStillFetching])
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
            <Heading>Nearest ATM</Heading>
          </IconAndTitle>
          <Item>
            <P>{minDistance ? minDistance.data.display_name : null}</P>
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
      <ATMLabel />
    </ATMWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  dataFromDB: selectSuccessFromDB,
  isAllDown: selectIsAllDown,
  minDistance: selectDistance,
  minDistanceDBID: selectMinDistanceDBID,
  selectIsRetrieveFromDBStillFetching: selectIsRetrieveFromDBStillFetching,
  minDistanceAtmDetails: selectMinDistanceATMDetails,
})

const mapDispatchToProps = (dispatch) => ({
  fetchMinDistanceDetail: (obj) =>
    dispatch(fetchMinDistanceDetailFromDBAsync(obj)),
  fetchMinDistanceDetailFromDBSuccess: () =>
    dispatch(fetchMinDistanceDetailFromDBSuccess(null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ATM)
