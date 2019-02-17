import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { rootReducer } from './reducers'
import { getSensorData } from './actions/SensorActions'
import MainContainer from './containers/MainContainer'

import './App.css';

const store = createStore(rootReducer , {}, applyMiddleware(ReduxThunk))

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      selectedOption: null,
      searchOptions: null,
      isLoading: true,
      sensors: [],
      error: null
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  filterSensors(event) {
    var updatedList = this.state.sensors;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({
      sensors: updatedList
    });
  }

  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    )
  }
}

export default App;
