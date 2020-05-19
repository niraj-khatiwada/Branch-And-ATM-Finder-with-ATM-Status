import { searchStateType } from '../../reducers.type'

const INITIAL_STATE = {
  isSearchFetching: false,
  searchedData: null,
  searcherror: undefined,
  mapZIndex: 0,
}

export const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchStateType.searchStart:
      return { ...state, isSearchFetching: true }
    case searchStateType.searchSuccess:
      return { ...state, searchedData: action.payload }
    case searchStateType.searchFailure:
      return { ...state, searcherror: action.payload }
    case 'CHANGE_Z_INDEX':
      return { ...state, mapZIndex: action.payload }
    default:
      return state
  }
}
