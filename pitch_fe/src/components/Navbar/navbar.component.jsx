import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useHistory } from 'react-router-dom'

import {
  SidebarWrapper,
  CustomTypography,
  CustomButton,
  CustomToolbar,
  CustomAppBar,
} from './navbar.styles'

import Search from '../../components/Search Input/Search.component'
import { selectSingleLocation } from '../../redux/reducers/location/location.selectors'
import { selectSearchedData } from '../../redux/reducers/search/search.selectors'
import { isSingleLocation } from '../../redux/reducers/location/location.action'
import ArrayListSidebar from '../utils/searchArrayList.component'

//
function Navbar({ isSingleLocation, searchData, isSingleLocationState }) {
  const history = useHistory()
  return (
    <>
      {!isSingleLocationState ? (
        <SidebarWrapper>
          <ArrayListSidebar handleClose={() => ''} />
        </SidebarWrapper>
      ) : null}
      <CustomAppBar position="static">
        <CustomToolbar>
          <div>
            <CustomTypography variant="h6" noWrap>
              Pitch
            </CustomTypography>
          </div>
          <Search />
          <div>
            {searchData !== null ? (
              <CustomButton
                onClick={() => {
                  isSingleLocation()
                  !isSingleLocationState
                    ? history.push('/')
                    : history.push('/all')
                }}
                variant="contained"
              >
                {isSingleLocationState ? `See all` : 'Go Back'}
              </CustomButton>
            ) : null}
          </div>
        </CustomToolbar>
      </CustomAppBar>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  searchData: selectSearchedData,
  isSingleLocationState: selectSingleLocation,
})

const mapDispatchToProps = (dispatch) => ({
  isSingleLocation: () => dispatch(isSingleLocation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
