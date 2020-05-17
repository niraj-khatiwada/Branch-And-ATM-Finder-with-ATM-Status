const INITIAL_STATE = {
  selectedLocation: [27.700769, 85.30014],
}
export const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOCATION_SELECTED':
      console.log(action.payload)
      return { ...state, selectedLocation: action.payload }
    default:
      return state
  }
}
