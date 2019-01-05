import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'

import Card from './components/Card'
import './App.css';

// API TOKEN
require('dotenv').config()

const ORIGIN = 'https://api.sensefinity.com';
const DEVICES = '/devices'

class App extends Component {

  state = {
    isLoading: true,
    sensors: [],
    error: null
  }

  fetchUsers() {
    console.log( process.env )
    fetch(`${ORIGIN + DEVICES}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + process.env.REACT_APP_SENSEFINITY_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Machinates-Application-Key' : 'machinates'
      }
    }).then(response => response.json())
      .then(data => {
        console.log( data );
        this.setState({
          sensors: data.value.items,
          isLoading: false,
        })
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { isLoading, sensors, error } = this.state;
    return (
    <React.Fragment>
      <Container>
        <h1> Sensors</h1>
        <div className='layout-grid'>
          { error ? <p> { error.message } </p> : null }
          {!isLoading ? (
            sensors.map( sensor => {
              const { 
                id, 
                serialNumber, 
                name, 
                aliveTime, 
                status, 
                signalStrength,
                positionTime,
                positionLatitude, 
                positionLongitude } = sensor;
              return (
                <div className='sensor' data-id={ id }>
                  <div className='form-group' key={ id }>
                    <Card sensor={ sensor }></Card>
                  </div>
                </div>
              );
            })
          ) : (
            <h3> Loading... </h3>
          )}
        </div>
      </Container>
    </React.Fragment>
    )
  }
}

export default App;
