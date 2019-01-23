import React, { Component } from 'react'
import { Card, Icon, Label, Modal, Button, Header, Image } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'
import Moment from 'react-moment';

import image from '../assets/images/sensor.png'

// API TOKEN
require('dotenv').config()

const ORIGIN = 'https://api.sensefinity.com'
const DEVICES = '/devices'
const measurementTypes = [1, 7, 13, 23, 73]

class CardView extends Component {
  constructor(props) {
    super(props);
  }

  state = { 
    open: false,
    data: [],
    temperatureData: [],
    humidityData: [],
    powerData: [],
    rssi: [],
    locationData: []
  }

  fetchMeasurement( sensor ) {
    const DEVICE = `/serialnumber/${sensor.name}`
    const MEASUREMENTS = '/measurements?type='
    let url = ORIGIN + DEVICES  + DEVICE + MEASUREMENTS

    measurementTypes.map( type => {
      url = url + type
      console.log( url )
      fetch( url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + process.env.REACT_APP_SENSEFINITY_TOKEN,
          'X-Machinates-Application-Key': process.env.REACT_APP_XMACHINATES_APPLICATION_KEY
        }
      }).then(response => response.json())
        .then(data => {
          if(type === 1) {
            this.setState({
              temperatureData: data,
            })
          }
          if(type === 7) {
            this.setState({
              powerData: data,
            })
          }
          if(type === 13) {
            this.setState({
              rssi: data,
            })
          }
          if(type === 23) {
            this.setState({
              humidityData: data,
            })
          }
        })
        // Catch any errors we hit and update the app
        .catch(error => this.setState({ error, isLoading: false }));
    })
    console.log( this.state )
  }

  handleClick( sensor ) {
    this.interval = setInterval(() => {
      this.fetchMeasurement( sensor );
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  truncate = (string, length) => {
    if (string.length > length)
      return string.slice(0, length) + '...'
    else
      return string
  };

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const sensor = this.props.sensor
    const { open, size } = this.state

    return (
      <div className='ui pointer'>
        <Label circular color={'olive'} data-tip data-for={ 'sensor_' + sensor.id } onClick={ this.show('large') }>
          { sensor.id } 
        </Label>
        <ReactTooltip id={ 'sensor_' + sensor.id } aria-haspopup='true' role='desc' place="top" effect="solid">
          <div className='card-description-header'>
            <h5 className='status'><Icon name='circle' size='small' color={'olive'} /> {sensor.status }</h5>
            <h2>{ this.truncate(sensor.name, 18) }</h2>
          </div>
          <h4 className='card-description-title'>Device ID:</h4>
          <p className='card-description-text'>{sensor.id }</p>
          <h4 className='card-description-title'>Serial Number:</h4>
          <p className='card-description-text'>{sensor.serialNumber }</p>
          <h4 className='card-description-title'>Alive Time:</h4>
          <p className='card-description-text'><Moment format="DD/MM/YYYY - hh:mm:ss A">{sensor.aliveTime }</Moment></p>
          <h4 className='card-description-title'>Signal Strength:</h4>
          <p className='card-description-text'>{sensor.signalStrength }</p>
          <h4 className='card-description-title'>Device Position Time:</h4>
          <p className='card-description-text'><Moment className='datetime'>{sensor.positionTime }</Moment></p>
          <h4 className='card-description-title'>Device Position Lat:</h4>
          <p className='card-description-text'>{sensor.positionLatitude }</p>
          <h4 className='card-description-title'>Device Position Long:</h4>
          <p className='card-description-text'>{sensor.positionLongitude }</p>
          <Modal basic dimmer='blurring' size={size} open={open} onClose={this.close}>
            <Modal.Content image>
              <Image wrapped size='medium' src={ image } />
              <Modal.Description>
                <Header inverted size='huge'>Device ID:: {this.props.sensor.id}</Header>
                <Header inverted size='medium'>Serial Number:: {this.props.sensor.name}</Header>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </ReactTooltip>
      </div>
    )
  }
}

export default CardView