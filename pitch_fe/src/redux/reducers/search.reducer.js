import { searchStateType } from './reducers.type'

const searchReducer_INITIAL_STATE = {
  isSearchFetching: false,
  searchedData: null,
  searcherror: undefined,
}

export const searchReducer = (state = searchReducer_INITIAL_STATE, action) => {
  switch (action.type) {
    case searchStateType.searchStart:
      return { ...state, isSearchFetching: true }
    case searchStateType.searchSuccess:
      return { ...state, searchedData: action.payload }
    case searchStateType.searchFailure:
      return { ...state, searcherror: action.payload }
    default:
      return state
  }
}

const selectedLocationReducer_INITIAL_STATE_ = {
  selectedLocation: null,
}
export const selectedLocationReducer = (
  state = selectedLocationReducer,
  action
) => {
  switch (action.type) {
    case 'LOCATION_SELECTED':
      return { ...state, selectedLocation: action.payload }
    default:
      return state
  }
}
