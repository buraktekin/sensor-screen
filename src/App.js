import React, { Component } from 'react';
import { Dropdown, Container, Grid } from 'semantic-ui-react'

import { stateOptions } from './common/data'
import Card from './components/Card'
import Navbar from './components/Navbar'
import './App.css';

// API TOKEN
require('dotenv').config()

const ORIGIN = 'https://api.sensefinity.com';
const DEVICES = '/devices'

class App extends Component {

  state = {
    selectedOption: null,
    isLoading: true,
    sensors: [],
    error: null
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  fetchUsers() {
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
    const { isLoading, sensors, error, selectedOption } = this.state;

    return (
      <React.Fragment>
        <Container>
          <Navbar />
          <h1> Sensors</h1>
          <Dropdown placeholder='Filter Sensors' fluid multiple search selection options={stateOptions} />
          <Grid columns={2}>
            <Grid.Column>
              <Grid doubling columns={ 2 }>
                { error ? <p> { error.message } </p> : null }
                {!isLoading ? (
                  sensors.sort((a,b) => {
                    return new Date(a.aliveTime).getTime() - 
                        new Date(b.aliveTime).getTime()
                  }).reverse().map( sensor => {
                    return (
                      <Grid.Column>
                        <Card sensor={ sensor } data-id={ sensor.id }></Card>
                      </Grid.Column>
                    );
                  })
                ) : (
                  <h3> Loading... </h3>
                )}
              </Grid>
            </Grid.Column>
            <Grid.Column>

            </Grid.Column>
          </Grid>
        </Container>
      </React.Fragment>
    )
  }
}

export default App;
