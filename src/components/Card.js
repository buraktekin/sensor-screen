import React, { Component } from 'react'
import { Icon, Label, Modal } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip'
import Moment from 'react-moment';

import Sensor from './Sensor'

// API TOKEN
require('dotenv').config()

class CardView extends Component {

  state = { 
    open: false,
    data: []
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
        <div className='ui sensor'>
          <Label className='ui sensor--detail' circular color={'olive'} data-tip data-for={ 'sensor_' + sensor.id } onClick={ this.show('fullscreen') }>
            <Label className='ui inner-circle' circular color={'teal'}></Label>
            <h3>{sensor.id}</h3>
          </Label>
        </div>
        <ReactTooltip id={ 'sensor_' + sensor.id } aria-haspopup='true' role='tooltip' place="top" effect="solid">
          <div className='card-description-header'>
            <h5 className='status'>
              <Icon name='circle' size='small' color={'olive'} /> {sensor.status }
            </h5>
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
            <Modal.Content>
              <Modal.Description>
                <Sensor sensor={ sensor }/>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </ReactTooltip>
      </div>
    )
  }
}

export default CardView