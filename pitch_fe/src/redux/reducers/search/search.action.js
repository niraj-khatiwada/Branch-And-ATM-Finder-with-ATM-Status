import {
  openStreetSearch,
  storeBranchToDB,
} from '../../axios config/axios.config'
import { searchStateType, storeToDBTypes } from '../../reducers.type'
import { cleanSearchQuery } from './cleanSearchQuery'

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

const storeToDBStart = () => ({
  type: storeToDBTypes.storeToDBStart,
})

const storeToDBResults = (dataArray) => ({
  type: storeToDBTypes.storeToDBResults,
  payload: dataArray,
})

export const searchFetchAsync = (searchQuery) => (dispatch) => {
  dispatch(searchStart())
  openStreetSearch(cleanSearchQuery(searchQuery))
    .then(async (res) => {
      if (res.data.length !== 0) {
        dispatch(searchSuccess(res.data))
        const getOnlyBank = res.data.filter(
          (item) => item.type === 'bank' || item.type === 'atm'
        )
        if (getOnlyBank.length !== 0) {
          dispatch(storeToDBStart())
          console.log(getOnlyBank)
          const idArray = await storeBranchToDB(getOnlyBank)
          dispatch(storeToDBResults(idArray))
        }
      } else {
        dispatch(searchSuccess(null))
        dispatch(setNoDataFound())
      }
    })
    .catch((error) => dispatch(searchFailure(error.response)))
}

export const setMapZIndex = (value) => ({
  type: 'CHANGE_Z_INDEX',
  payload: value,
})
