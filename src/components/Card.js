import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import Moment from 'react-moment';

const selectedSensors = []
const truncate = ( (string, length) => {
  if (string.length > length)
    return string.slice(0, length) + '...'
  else
    return string
});

const getSelectedSensorData = ( sensor ) => {
  console.log( sensor );
  const DEVICE = `/serialnumber/${sensor.id}`
  const MEASUREMENTS_TYPES = '/measurementstypes'
  const MEASUREMENTS = '/measurements?type='
  
  selectedSensors.push(sensor );
  console.log( selectedSensors );
};

const CardView = ( { sensor } ) => (
  <Card>
    {/* <Image src={image } /> */} 
    <Card.Content extra onClick={ () => getSelectedSensorData( sensor ) }>
      <p><Icon name='podcast' size='large' /> Device ID: {sensor.id }</p>
    </Card.Content>
    
    <Card.Content>
      <Card.Header>
        { truncate(sensor.name, 18) }
      </Card.Header>
      <Card.Meta>
        <span className='date'>{sensor.status }</span>
      </Card.Meta>
      <Card.Description>
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
      </Card.Description>
    </Card.Content>
  </Card>
)

export default CardView