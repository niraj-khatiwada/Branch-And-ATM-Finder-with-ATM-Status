const INITIAL_STATE = {
  isSingleLocation: true,
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
  },
}
export const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOCATION_SELECTED':
      return {
        ...state,
        selectedLocationDetail: action.payload,
      }
    case 'IS_SINGLE_LOCATION':
      return {
        ...state,
        isSingleLocation: !state.isSingleLocation,
      }
    default:
      return state
  }
}
