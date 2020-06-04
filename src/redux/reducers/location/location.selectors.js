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

export const selectLocationDetailsFromDB = createSelector(
  [selectLocation],
  (location) => location.selectedLocationDetailFromDB
)

export const selectSuccessFromDB = createSelector(
  [selectLocationDetailsFromDB],
  (selectedLocationDetailFromDB) =>
    selectedLocationDetailFromDB.fetchedDataFromDBSuccess
      ? selectedLocationDetailFromDB.fetchedDataFromDBSuccess
      : null
)

export const selectIsRetrieveFromDBStillFetching = createSelector(
  [selectLocationDetailsFromDB],
  (selectedLocationDetailFromDB) => selectedLocationDetailFromDB.isFetching
)

export const selectIsAllDown = createSelector(
  [selectSuccessFromDB],
  (fetchedDataFromDBSuccess) =>
    fetchedDataFromDBSuccess
      ? fetchedDataFromDBSuccess.atm.length !== 0
        ? fetchedDataFromDBSuccess.atm.every((item) => item.status === false)
        : null
      : null
)

export const selectMinDistance = createSelector(
  [selectLocation],
  (location) => location.minDistanceDetailFromDB
)

export const selectMinDistanceATMDetails = createSelector(
  [selectMinDistance],
  (minDistanceDetails) =>
    minDistanceDetails !== null
      ? minDistanceDetails.minDistanceDetailFromDBSuccess
      : null
)

export const selectMinDistanceFromDBError = createSelector(
  [selectMinDistance],
  (minDistanceDetailFromDB) =>
    minDistanceDetailFromDB.minDistanceDetailFromDBError
)
