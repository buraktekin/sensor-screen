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
        <strong>Serial Number:</strong>
        <p>{ props.sensor.serialNumber }</p>
        <strong>Alive Time:</strong>
        <p><Moment format="DD/MM/YYYY - hh:mm:ss A">{ props.sensor.aliveTime }</Moment></p>
        <strong>Signal Strength:</strong>
        <p>{ props.sensor.signalStrength }</p>
        <strong>Device Position Time:</strong>
        <p><Moment className='datetime'>{ props.sensor.positionTime }</Moment></p>
        <strong>Device Position Lat:</strong>
        <p>{ props.sensor.positionLatitude }</p>
        <strong>Device Position Long:</strong>
        <p>{ props.sensor.positionLongitude }</p>
      </Card.Description>
    </Card.Content>
  </Card>
)

export default CardExampleCard