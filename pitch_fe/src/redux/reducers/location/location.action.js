export const selectedLocation = (locationDetails) => ({
  type: 'LOCATION_SELECTED',
  payload: locationDetails,
})

export const isSingleLocation = () => ({
  type: 'IS_SINGLE_LOCATION',
})

export const snackBar = (bool) => ({
  type: 'SNACKBAR_STATE',
  payload: bool,
})

export const setHoverItem = (item) => ({
  type: 'HOVER_ITEM',
  payload: item,
})
