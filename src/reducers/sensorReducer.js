const INITIAL_STATE = {
   sensors: [],
   error: null,
   isLoading: true,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "GET_SENSORS":
      return { ...state, isLoading: true }
    case "GET_SENSORS_SUCCESS":
      return { ...state, sensors: action.payload, isLoading: false}
    case "GET_SENSORS_ERROR":
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
  
}