const INITIAL_STATE = {
  selectedLocationDetail: [
    {
      place_id: 235452178,
      licence:
        'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
      osm_type: 'relation',
      osm_id: 184633,
      boundingbox: ['26.3477581', '30.446945', '80.0586226', '88.2015257'],
      lat: '28.1083929',
      lon: '84.0917139',
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
    },
  ],
}
export const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOCATION_SELECTED':
      return {
        ...state,
        selectedLocationDetail: [action.payload],
      }
    default:
      return state
  }
}
