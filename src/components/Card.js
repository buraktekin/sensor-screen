import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import Moment from 'react-moment';

const truncate = ( (string, length) => {
  if (string.length > length)
    return string.slice(0, length) + '...'
  else
    return string
});

const CardExampleCard = ( props ) => (
  <Card>
    {/* <Image src={ props.image } /> */} 
    <Card.Content extra>
      <p><Icon name='podcast' size='large' /> Device ID: { props.sensor.id }</p>
    </Card.Content>
    
    <Card.Content>
      <Card.Header>
        { truncate(props.sensor.name, 18) }
      </Card.Header>
      <Card.Meta>
        <span className='date'>{ props.sensor.status }</span>
      </Card.Meta>
      <Card.Description>
        <h4 className='card-description-title'>Serial Number:</h4>
        <p className='card-description-text'>{ props.sensor.serialNumber }</p>
        <h4 className='card-description-title'>Alive Time:</h4>
        <p className='card-description-text'><Moment format="DD/MM/YYYY - hh:mm:ss A">{ props.sensor.aliveTime }</Moment></p>
        <h4 className='card-description-title'>Signal Strength:</h4>
        <p className='card-description-text'>{ props.sensor.signalStrength }</p>
        <h4 className='card-description-title'>Device Position Time:</h4>
        <p className='card-description-text'><Moment className='datetime'>{ props.sensor.positionTime }</Moment></p>
        <h4 className='card-description-title'>Device Position Lat:</h4>
        <p className='card-description-text'>{ props.sensor.positionLatitude }</p>
        <h4 className='card-description-title'>Device Position Long:</h4>
        <p className='card-description-text'>{ props.sensor.positionLongitude }</p>
      </Card.Description>
    </Card.Content>
  </Card>
)

export default CardExampleCard