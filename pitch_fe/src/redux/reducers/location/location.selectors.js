import { createSelector } from 'reselect'

const selectLocation = (state) => state.location

export const selectSelectedLocationDetail = createSelector(
  [selectLocation],
  (location) => location.selectedLocationDetail
)
