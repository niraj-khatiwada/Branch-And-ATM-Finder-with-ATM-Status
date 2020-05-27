export const searchStateType = {
  searchStart: 'SEARCH_START',
  searchSuccess: 'SEARCH_SUCCESS',
  searchFailure: 'SEARCH_FAILURE',
}

export const storeToDBTypes = {
  storeToDBStart: 'STORE_TO_DB_START',
  storeToDBResults: 'STORE_TO_DB_RESULTS',
}
export const detailsFromDBTypes = {
  fetchStart: 'FETCH_LOCATION_FROM_DB_START',
  fetchSuccess: 'FETCH_LOCATION_FROM_DB_SUCCESS',
  fetchFailure: 'FETCH_LOCATION_FROM_DB_FAILURE',
}

export const secondaryTypes = {
  changeZIndex: 'CHANGE_Z_INDEX',
  noDataFound: 'NO_DATA_FOUND',
  locationSelected: 'LOCATION_SELECTED',
  isSingleLocaion: 'IS_SINGLE_LOCATION',
  snackBarState: 'SNACKBAR_STATE',
  hoverItem: 'HOVER_ITEM',
  isAllDown: 'IS_ALL_DOWN',
}

export const minDistanceDetailsFromDBTypes = {
  fetchStart: 'FETCH_MIN_DISTANCE_DETAIL_FROM_DB_START',
  fetchSuccess: 'FETCH_MIN_DISTANCE_DETAIL_FROM_DB_SUCCESS',
  fetchFailure: 'FETCH_MIN_DISTANCE_DETAIL_FROM_DB_FAILURE',
}
