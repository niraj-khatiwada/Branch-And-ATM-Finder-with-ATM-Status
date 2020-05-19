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

export const searchFetchAsync = (searchQuery) => (dispatch) => {
  dispatch(searchStart)
  openStreetSearch(searchQuery)
    .then((res) => {
      dispatch(searchSuccess(res.data))
    })
    .catch((error) => dispatch(searchFailure(error.response)))
}
