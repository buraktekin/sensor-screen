import React, { Component } from 'react';
import { Dropdown, Container, Grid, Segment, Button, Label } from 'semantic-ui-react'

import { countryOptions } from './common/data'
import Card from './components/Card'
import './App.css';

// API TOKEN
require('dotenv').config()

const ORIGIN = 'https://api.sensefinity.com';
const DEVICES = '/devices'

class App extends Component {

  state = {
    log: [],
    logCount: 0,
    selectedOption: null,
    isLoading: true,
    sensors: [],
    error: null
  }

  writeLog = eventName => this.setState({
    log: [`${new Date().toLocaleTimeString()}: ${eventName}`, ...this.state.log].slice(0, 20),
    logCount: this.state.logCount + 1,
  })

  handleOpen = () => {
    console.log('it works')
    this.writeLog('onOpen()')
  }
  
  handleClose = () => {
    this.writeLog('onClose()')
  }
  
  clearLog = () => this.setState({ log: [], logCount: 0 })

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
    const { isLoading, sensors, error, log, logCount, selectedOption } = this.state;

    return (
      <React.Fragment>
        <Container>
          <Segment raised>
            <Grid divided='vertically'>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <div className='header'>
                    <img className='header--icon' src="https://img.icons8.com/nolan/64/000000/online.png" />
                    <div className='company'>
                      <h1 className='company--name'>FAZLA GIDA</h1>
                      <h4 className='company--prefix'>Sensors </h4>
                    </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Dropdown placeholder='Filter Sensors' fluid multiple search selection options={countryOptions} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
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
                            <Card sensor={ sensor } data-id={ sensor.id } onClick={ this.handleOpen }></Card>
                          </Grid.Column>
                        );
                      })
                    ) : (
                      <h3> Loading... </h3>
                    )}
                  </Grid>
                </Grid.Column>

                <Grid.Column>
                  <Segment.Group>
                    <Segment>
                      <Button compact size='small' floated='right' onClick={this.clearLog}>
                        Clear
                      </Button>
                      Event Log <Label circular>{logCount}</Label>
                    </Segment>
                    
                    <Segment secondary>
                      <pre>{log.map((e, i) => <div key={i}>{e}</div>)}</pre>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </React.Fragment>
    )
  }
}

export default App;
