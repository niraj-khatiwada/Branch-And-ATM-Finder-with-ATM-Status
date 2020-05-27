import { detailsFromDBTypes, secondaryTypes } from '../../reducers.type'

const INITIAL_STATE = {
  isSingleLocation: true,
  snackBarState: false,
  hoverItem: null,
  selectedLocationDetail: {
    place_id: 235452178,
    licence:
      'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
    osm_type: 'relation',
    osm_id: 184633,
    boundingbox: ['26.3477581', '30.446945', '80.0586226', '88.2015257'],
    lat: '27.700769',
    lon: '85.300140',
    display_name: 'नेपाल',
    mAddress: 'नेपाल',
    class: 'boundary',
    type: 'administrative',
    importance: 0.7097698150324357,
    icon:
      'https://nominatim.openstreetmap.org/images/mapicons/poi_boundary_administrative.p.20.png',
    address: {
      country: 'नेपाल',
      country_code: 'np',
    },
    namedetails: {
      name: '',
    },
    extratags: {
      website: '',
    },
  },
  selectedLocationDetailFromDB: {
    isFetching: false,
    fetchedDataFromDBSuccess: null,
    fetchedDataFromDBError: null,
  },
  isAllDown: false,
}
export const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case secondaryTypes.locationSelected:
      return {
        ...state,
        selectedLocationDetail: action.payload,
      }
    case secondaryTypes.isSingleLocaion:
      return {
        ...state,
        isSingleLocation: !state.isSingleLocation,
      }
    case secondaryTypes.snackBarState:
      return { ...state, snackBarState: action.payload }
    case secondaryTypes.hoverItem:
      return { ...state, hoverItem: action.payload }
    case detailsFromDBTypes.fetchStart:
      return {
        ...state,
        selectedLocationDetailFromDB: {
          ...state.selectedLocationDetailFromDB,
          isFetching: true,
        },
      }
    case detailsFromDBTypes.fetchSuccess:
      return {
        ...state,
        selectedLocationDetailFromDB: {
          ...state.selectedLocationDetailFromDB,
          isFetching: false,
          fetchedDataFromDBSuccess: action.payload,
          fetchedDataFromDBError: null,
        },
      }
    case detailsFromDBTypes.fetchFailure:
      return {
        ...state,
        selectedLocationDetailFromDB: {
          ...state.selectedLocationDetailFromDB,
          isFetching: false,
          fetchedDataFromDBError: action.payload,
          fetchedDataFromDBSuccess: null,
        },
      }
    case secondaryTypes.isAllDown:
      return { ...state, isAllDown: action.payload }
    default:
      return state
  }
}
