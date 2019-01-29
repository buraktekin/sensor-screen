import axios from 'axios'
require('dotenv').config()
axios.defaults.headers.common['Authorization'] = `Basic ${process.env.REACT_APP_SENSEFINITY_TOKEN}`
axios.defaults.headers.common['X-Machinates-Application-Key'] = process.env.REACT_APP_XMACHINATES_APPLICATION_KEY
const ORIGIN = 'https://api.sensefinity.com'
const DEVICES = '/devices'

export const getSensors = () => {
  return dispatch => {
    dispatch({type: 'GET_SENSORS'})
    return axios.get(`${ORIGIN + DEVICES}`)
      .then((result) => {
        dispatch({
          type: 'GET_SENSORS_SUCCESS',
          payload: result.data.value.items
        })
      })
      .catch(error => {
        dispatch({
          type: "GET_SENSORS_ERROR",
          payload: error
        })
      })
  }
}