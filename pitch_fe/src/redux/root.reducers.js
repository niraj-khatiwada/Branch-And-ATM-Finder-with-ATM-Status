import { combineReducers } from 'redux'
import { searchReducer } from './reducers/search/search.reducer'
import { locationReducer } from './reducers/location/location.reducers'

export default combineReducers({
  search: searchReducer,
  location: locationReducer,
})
