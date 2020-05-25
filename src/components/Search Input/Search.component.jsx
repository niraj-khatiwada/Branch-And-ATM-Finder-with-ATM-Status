import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { SearchWrapper } from './Search.styles'
import SearchDropdown from '../Search  Dropdown/searchDropdown.component'
import {
  WithSpinner,
  SearchWithSpinnerWrapper,
} from '../../components/HOC withSpinner/withSpinner.styles'

import { selectIsSearchFetching } from '../../redux/reducers/search/search.selectors'
import InputBase from './Input Base/InputBase.component'

//
function Search({ isSearching }) {
  const [searchDropdownState, setsearchDropdownState] = React.useState(false)

  const handleClose = () => {
    setsearchDropdownState(false)
  }
  return (
    <>
      <SearchWrapper>
        <InputBase
          setsearchDropdownState={() => setsearchDropdownState(true)}
        />
        {searchDropdownState ? (
          <SearchDropdown handleClose={handleClose} />
        ) : null}
        <SearchWithSpinnerWrapper>
          {isSearching ? <WithSpinner></WithSpinner> : null}
        </SearchWithSpinnerWrapper>
      </SearchWrapper>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  isSearching: selectIsSearchFetching,
})

export default connect(mapStateToProps)(React.memo(Search))
