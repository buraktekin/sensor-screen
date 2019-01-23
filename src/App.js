import React, { Component } from 'react';
import { Dropdown, Grid, Segment } from 'semantic-ui-react'

import Item from './components/Card'
import './App.css';

// API TOKEN
require('dotenv').config()

const ORIGIN = 'https://api.sensefinity.com'
const DEVICES = '/devices'

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

  dataFormat = (data) => {
    const formattedData = new Array();
    data.map( item => {
      formattedData.push(
        {
          key: item.id,
          value: item.serialNumber,
          text: item.id + ':: ' + item.name
        }
      )
    })
    return formattedData
  }

  fetchSensors() {
    fetch(`${ORIGIN + DEVICES}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + process.env.REACT_APP_SENSEFINITY_TOKEN,
        'X-Machinates-Application-Key': process.env.REACT_APP_XMACHINATES_APPLICATION_KEY
      }
    }).then(response => response.json())
      .then(data => {
        this.setState({
          sensors: data.value.items,
          searchOptions: this.dataFormat(data.value.items),
          isLoading: false,
        })
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
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

  componentDidMount() {
    this.fetchSensors();
    this.setState({
      sensors: this.state.sensors,
    })
    console.log(this.state.sensors)
  }

  render() {
    const { isLoading, sensors, error, searchOptions } = this.state;

    return (
      <React.Fragment>
        <Segment raised>
          <Grid divided='vertically'>
            <Grid.Row columns={1}>
              <Grid.Column>
                <div className='header'>
                  <img className='header--icon' src="https://img.icons8.com/nolan/50/000000/online.png" />
                  <div className='company'>
                    <h1 className='company--name'>FAZLAGIDA</h1>
                    <h4 className='company--prefix'>Sensors </h4>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Dropdown placeholder='Filter Sensors' fluid search selection options={ searchOptions } onChange={ this.filterSensors } />
              </Grid.Column>
            </Grid.Row>

            <div className='ui horizontal-container'>
              { error ? <p> { error.message } </p> : null }
                {!isLoading ? (
                  sensors.sort((a,b) => {
                    return new Date(a.aliveTime).getTime() - 
                        new Date(b.aliveTime).getTime()
                  }).reverse().map( sensor => {
                    console.log( sensor )
                    return (
                      <Grid.Column id={ sensor.id }>
                        <Item sensor={ sensor } />
                      </Grid.Column>
                    );
                  })
                ) : (
                  <h3> Loading... </h3>
                )}
            </div>
          </Grid>
          <h4>FAZLAGIDA</h4>
        </Segment>
      </React.Fragment>
    )
  }
}

export default App;
