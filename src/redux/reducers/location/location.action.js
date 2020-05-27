import { fetchLocationDetailsFromDB } from '../../axios config/axios.config'
import {
  detailsFromDBTypes,
  secondaryTypes,
  minDistanceDetailsFromDBTypes,
} from '../../reducers.type'

export const selectedLocation = (locationDetails) => ({
  type: 'LOCATION_SELECTED',
  payload: locationDetails,
})

export const isSingleLocation = () => ({
  type: 'IS_SINGLE_LOCATION',
})

export const snackBar = (bool) => ({
  type: 'SNACKBAR_STATE',
  payload: bool,
})

export const setHoverItem = (item) => ({
  type: 'HOVER_ITEM',
  payload: item,
})

const fetchLocationFromDBStart = () => ({
  type: detailsFromDBTypes.fetchStart,
})

export const fetchLocationFromDBSuccess = (data) => ({
  type: detailsFromDBTypes.fetchSuccess,
  payload: data,
})

const fetchLocationFromDBFailure = (error) => ({
  type: detailsFromDBTypes.fetchFailure,
  payload: error,
})

export const getLocationDetailFromDBAsync = (obj) => (dispatch) => {
  dispatch(fetchLocationFromDBStart())
  fetchLocationDetailsFromDB(obj)
    .then((res) => {
      dispatch(fetchLocationFromDBSuccess(res.data))
    })
    .catch((error) => {
      dispatch(fetchLocationFromDBFailure(error.response))
    })
}

export const setIsAllDown = (value) => ({
  type: secondaryTypes.isAllDown,
  payload: value,
})

const fetchMinDistanceDetailFromDBStart = () => ({
  type: minDistanceDetailsFromDBTypes.fetchStart,
})

const fetchMinDistanceDetailFromDBSuccess = (data) => ({
  type: minDistanceDetailsFromDBTypes.fetchSuccess,
  payload: data,
})

const fetchMinDistanceDetailFromDBFailure = (error) => ({
  type: minDistanceDetailsFromDBTypes.fetchFailure,
  payload: error,
})
export const fetchMinDistanceDetailFromDBAsync = (id) => (dispatch) => {
  dispatch(fetchMinDistanceDetailFromDBStart())
    .then((res) => dispatch(fetchMinDistanceDetailFromDBSuccess(res.data)))
    .catch((error) =>
      dispatch(fetchMinDistanceDetailFromDBFailure(error.response))
    )
}
