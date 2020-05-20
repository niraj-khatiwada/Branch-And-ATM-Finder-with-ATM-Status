import { openStreetSearch } from '../../../components/utils/axios.config'
import { searchStateType } from '../../reducers.type'
const searchStart = () => ({
  type: searchStateType.searchStart,
})

const searchSuccess = (data) => ({
  type: searchStateType.searchSuccess,
  payload: data,
})

const searchFailure = (error) => ({
  type: searchStateType.searchFailure,
  payload: error,
})

export const setNoDataFound = () => ({
  type: 'NO_DATA_FOUND',
})

export const searchFetchAsync = (searchQuery) => (dispatch) => {
  dispatch(searchStart())
  openStreetSearch(searchQuery)
    .then((res) => {
      res.data.length !== 0
        ? dispatch(searchSuccess(res.data))
        : dispatch(setNoDataFound())
    })
    .catch((error) => dispatch(searchFailure(error.response)))
}

export const setMapZIndex = (value) => ({
  type: 'CHANGE_Z_INDEX',
  payload: value,
})
