import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Branch from './Branch/Branch.component'
import ATM from './ATM/ATM.component'
import Bank from './Bank/Bank.component'

import { ContentWrapper, WithSpinnerWrapper } from './Content.styles'

import { WithSpinner } from '../../../HOC withSpinner/withSpinner.styles'
import { selectIsStoreToDBFetching } from '../../../../redux/reducers/search/search.selectors'

import {
  selectSuccessFromDB,
  selectSelectedLocationDetail,
  selectIsRetrieveFromDBStillFetching,
  selectIsAllDown,
} from '../../../../redux/reducers/location/location.selectors'

function Content({
  dataFromDB,
  selectedLocation,
  isDBStillFetching,
  isRetrieveFromDBStillFetching,
  isAllDown,
}) {
  return (
    <ContentWrapper>
      <Branch />
      {dataFromDB ? (
        <>
          {selectedLocation.type === 'bank' &&
          !isRetrieveFromDBStillFetching ? (
            dataFromDB.atm.length !== 0 ? (
              <ATM type={selectedLocation.type} />
            ) : null
          ) : dataFromDB.atm ? (
            <ATM type={selectedLocation.type} />
          ) : null}
          {!isAllDown ? <Bank /> : <ATM />}
        </>
      ) : isDBStillFetching ? (
        <WithSpinnerWrapper>
          <WithSpinner color="white" />
        </WithSpinnerWrapper>
      ) : null}
    </ContentWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedLocation: selectSelectedLocationDetail,
  dataFromDB: selectSuccessFromDB,
  isDBStillFetching: selectIsStoreToDBFetching,
  isRetrieveFromDBStillFetching: selectIsRetrieveFromDBStillFetching,
  isAllDown: selectIsAllDown,
})

export default connect(mapStateToProps)(Content)
