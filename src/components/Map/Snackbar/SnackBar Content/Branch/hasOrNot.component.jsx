import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectSelectedLocationDetail } from '../../../../../redux/reducers/location/location.selectors'

import { ItemHeading, Item, P } from '../../SnackBar Content/Content.styles'

function HasOrNot({ category, item, name, selectedLocation }) {
  return selectedLocation[category][item] ? (
    <Item>
      <ItemHeading>{name}: </ItemHeading>
      <P>{selectedLocation[category][item]}</P>
    </Item>
  ) : null
}

const mapStateToProps = createStructuredSelector({
  selectedLocation: selectSelectedLocationDetail,
})

export default connect(mapStateToProps)(HasOrNot)
