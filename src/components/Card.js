import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import Moment from 'react-moment';

const CardExampleCard = ( props ) => (
  <Card>
    {/* <Image src={ props.image } /> */} 
    <Card.Content>
      <Card.Header> { props.name } </Card.Header>
      <Card.Meta>
        <span className='date'>{ props.status }</span>
      </Card.Meta>
      <Card.Description>
        <input type='checkbox' />
        <p><strong>Serial Number:</strong> { props.sensor.serialNumber }</p>
        <p><strong>Alive Time:</strong> <Moment format="DD/MM/YYYY">{ props.sensor.aliveTime }</Moment></p>
        <p><strong>Signal Strength:</strong> { props.sensor.signalStrength }</p>
        <p><strong>Device Position Time:</strong>
          <Moment format="DD/MM/YYYY">{ props.sensor.positionTime }</Moment>
        </p>
        <p><strong>Device Position Lat:</strong> { props.sensor.positionLatitude }</p>
        <p><strong>Device Position Long:</strong> { props.sensor.positionLongitude }</p>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' /> Device ID: { props.sensor.id }
      </a>
    </Card.Content>
  </Card>
)

export default CardExampleCard