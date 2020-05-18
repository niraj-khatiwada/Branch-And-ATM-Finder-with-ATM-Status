import React from 'react'

import { Dropdown } from './searchDropdown.styles'

import ArrayList from '../utils/searchArrayList.component'

function SearchDropdown({ handleClose }) {
  React.useEffect(() => {
    const dropdown = document.getElementById('searchDropdown')
    const searchInput = document.getElementById('searchInput')
    document.addEventListener(
      'click',
      (evt) => {
        if (
          !dropdown.contains(evt.target) &&
          !searchInput.contains(evt.target)
        ) {
          return handleClose()
        }
      },
      () => {
        document.removeEventListener('click', handleClose)
      }
    )
  })
  return (
    <Dropdown id="searchDropdown">
      <ArrayList handleClose={handleClose} />
    </Dropdown>
  )
}

export default SearchDropdown
