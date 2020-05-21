import {
  openStreetSearch,
  storeBranchToDB,
} from '../../../components/utils/axios.config'
import { searchStateType } from '../../reducers.type'
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

export const searchFetchAsync = (searchQuery) => (dispatch) => {
  dispatch(searchStart())
  openStreetSearch(cleanSearchQuery(searchQuery))
    .then((res) => {
      if (res.data.length !== 0) {
        dispatch(searchSuccess(res.data))
        const getOnlyBank = res.data.filter((item) => item.type === 'bank')
        if (getOnlyBank.length !== 0) {
          storeBranchToDB(res.data)
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

// {
//   "place_id": 61561259,
//   "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//   "osm_type": "node",
//   "osm_id": 5221274621,
//   "boundingbox": [
//       "27.6958553",
//       "27.6959553",
//       "85.3266634",
//       "85.3267634"
//   ],
//   "lat": "27.6959053",
//   "lon": "85.3267134",
//   "display_name": "Everest Bank, टङ्कप्रसाद सडक, Pushpa Nagar, Ghattekulo, काठमाडौं, वाग्मती प्रदेश, PO BOX 4058, Nepal",
//   "class": "amenity",
//   "type": "bank",
//   "importance": 0.201,
//   "icon": "https://nominatim.openstreetmap.org/images/mapicons/money_bank2.p.20.png",
//   "address": {
//       "bank": "Everest Bank",
//       "road": "टङ्कप्रसाद सडक",
//       "neighbourhood": "Pushpa Nagar",
//       "suburb": "Ghattekulo",
//       "city": "काठमाडौं",
//       "county": "काठमाडौं",
//       "region": "वाग्मती प्रदेश",
//       "postcode": "PO BOX 4058",
//       "country": "Nepal",
//       "country_code": "np"
//   },
//   "svg": "cx=\"85.3267134\" cy=\"-27.6959053\"",
//   "extratags": {
//       "opening_hours": "Su-Fr 10:00-03:00"
//   },
//   "namedetails": {
//       "name:en": "Everest Bank"
//   }
// }
