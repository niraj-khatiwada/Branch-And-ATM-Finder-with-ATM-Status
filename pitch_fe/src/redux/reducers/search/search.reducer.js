import { searchStateType, secondaryTypes } from '../../reducers.type'

const INITIAL_STATE = {
  isSearchFetching: false,
  searchedData: null,
  searcherror: undefined,
  noDataFound: [{ mAddress: 'No matching bank, branch or ATM found' }],
  mapZIndex: 0,
}

export const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchStateType.searchStart:
      return { ...state, isSearchFetching: true }
    case searchStateType.searchSuccess:
      return { ...state, searchedData: action.payload, isSearchFetching: false }
    case searchStateType.searchFailure:
      return { ...state, searcherror: action.payload, isSearchFetching: false }
    case secondaryTypes.changeZIndex:
      return { ...state, mapZIndex: action.payload }
    case secondaryTypes.noDataFound:
      return { ...state, isSearchFetching: false }
    default:
      return state
  }
}
