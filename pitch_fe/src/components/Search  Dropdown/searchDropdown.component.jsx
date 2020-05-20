import React from 'react'
import { connect } from 'react-redux'

import { Dropdown } from './searchDropdown.styles'
import ArrayList from '../utils/searchArrayList.component'
import { setMapZIndex } from '../../redux/reducers/search/search.action'

function SearchDropdown({ handleClose, setMapZIndex, ZIndex }) {
  const searchDropdownRef = React.useRef(null)
  React.useEffect(() => {
    const dropdown = searchDropdownRef.current
    const searchInput = document.getElementById('searchInput')
    document.addEventListener('click', (evt) => {
      if (!dropdown.contains(evt.target) && !searchInput.contains(evt.target)) {
        return handleClose()
      }
    })
    return () => {
      setMapZIndex(0)
      return document.removeEventListener('click', () => handleClose())
    }
  }, [ZIndex])
  return (
    <Dropdown id="searchDropdown" ref={searchDropdownRef}>
      <ArrayList handleClose={handleClose} />
    </Dropdown>
  )
}
const mapStateToProps = (state) => ({
  ZIndex: state.search.mapZIndex,
})

const mapDispatchToProps = (dispatch) => ({
  setMapZIndex: (value) => dispatch(setMapZIndex(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchDropdown)
