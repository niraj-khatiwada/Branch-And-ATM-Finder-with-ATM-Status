import { createSelector } from 'reselect'

const selectLocation = (state) => state.location

export const selecthoverItem = createSelector(
  [selectLocation],
  (location) => location.hoverItem
)
export const selectSelectedLocationDetail = createSelector(
  [selectLocation],
  (location) => location.selectedLocationDetail
)

export const selectSingleLocation = createSelector(
  [selectLocation],
  (location) => location.isSingleLocation
)
export const selectSnackBarState = createSelector(
  [selectLocation],
  (location) => location.snackBarState
)
