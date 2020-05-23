import React from 'react'
import { connect } from 'react-redux'

import { Dropdown } from './searchDropdown.styles'
import ArrayList from '../utils/searchArrayList.component'
import { setMapZIndex } from '../../redux/reducers/search/search.action'

function SearchDropdown({ handleClose, setMapZIndex }) {
  React.useEffect(() => {
    const dropdown = document.getElementById('searchDropdown')
    const searchInput = document.getElementById('searchInput')
    document.addEventListener('click', (evt) => {
      if (!dropdown.contains(evt.target) && !searchInput.contains(evt.target)) {
        return handleClose()
      }
    })
    return () => {
      setMapZIndex(0)
      handleClose()
      return document.removeEventListener('click', () => handleClose())
    }
  }, [])
  return (
    <Dropdown id="searchDropdown">
      <ArrayList handleClose={handleClose} />
    </Dropdown>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setMapZIndex: (value) => dispatch(setMapZIndex(value)),
})

export default connect(null, mapDispatchToProps)(SearchDropdown)
