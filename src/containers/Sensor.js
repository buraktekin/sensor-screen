import React, { Component } from 'react'
import { Grid, Segment, Card, Image, Form, GridColumn } from 'semantic-ui-react'
import DateTimePicker from 'react-datetime-picker'
import Moment from 'react-moment';
import moment from 'moment'
import { connect } from 'react-redux'

// Highchart requirements
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { tempOptions } from '../common/data'

// Source the image
import image from '../assets/images/sensor.png'

import { fetchMeasurements } from '../actions/SensorActions'

const ORIGIN = 'https://api.sensefinity.com'
const DEVICES = '/devices'

class Sensor extends Component {

  state = {
    data: [],
    dateStart: null,
    dateEnd: null,
  }

  initialize() {
    this.setTimeRange()
    this.fetchMeasurement()
  }

  setURL(type) {
    const DEVICE = `/serialnumber/${this.props.sensor.serialNumber}`
    const MEASUREMENTS = '/measurements?type='
    return ORIGIN + DEVICES  + DEVICE + MEASUREMENTS + type
  }

  setTimeRange() {
    this.setState({
      dateStart: moment(new Date()).toISOString(),
      dateEnd: moment(new Date()).add(-12, 'hours').toISOString()
    })
  }

  formatData( data ) {
    const sensorMeasurement = []
    const categories = []
    data.map(( datum ) => {
      categories.push( moment(datum.time).format('DD/MM/YYYY hh:mm A') )
      sensorMeasurement.push( [datum.time, datum.value] )
    })
    return [categories, sensorMeasurement]
  }

  componentDidMount = async() => {
    const { serialNumber } = this.props.sensor
    const { dateStart, dateEnd } = this.state
    console.log(serialNumber)
    await this.props.fetchMeasurements(dateStart, dateEnd, serialNumber)
    console.log(this.props.measurements)
  }
  
  render() {
    const { data } = this.state
    const { sensor, measurements, isMeasurementsLoading } = this.props
    const formattedData = this.formatData( measurements )
    const options = tempOptions( formattedData )
    return (
      !isMeasurementsLoading && (
        <Grid relaxed columns={2}>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card className='card--content'>
                <h4 className='status'>{sensor.status }</h4>
                <Image src={ image } size='large'/>
                <h2 className='card-description-title'>Alive Time:</h2>
                <p className='card-description-text'><Moment format="DD/MM/YYYY - hh:mm:ss A">{sensor.aliveTime }</Moment></p>
                <h4 className='card-description-title'>Device ID:</h4>
                <p className='card-description-text'>{sensor.id }</p>
                <h4 className='card-description-title'>Serial Number:</h4>
                <p className='card-description-text'>{sensor.serialNumber }</p>
                <h4 className='card-description-title'>Signal Strength:</h4>
                <p className='card-description-text'>{sensor.signalStrength }</p>
              </Card>
            </Grid.Column>

            <Grid.Column width={12}>
              <Segment>
                <Grid divided='vertically'>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <Form size={'tiny'} key={'tiny'}>
                        <Form.Group widths='equal'>
                          <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-first-name'
                            label='Start Date'
                            placeholder='Select s start day to filter'
                          />
                          <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-last-name'
                            label='End Date'
                            placeholder='Select an end date to filter'
                          />
                        </Form.Group>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <HighchartsReact highcharts={ Highcharts } options={ options } />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <HighchartsReact highcharts={ Highcharts } options={ options } />
                    </Grid.Column>
                    <Grid.Column>
                      <HighchartsReact highcharts={ Highcharts } options={ options } />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      )
    )
  }
}

const mapStateToProps = ({ sensorReducers }) => {
  const { measurements, isMeasurementsLoading } = sensorReducers
  return { 
    measurements, isMeasurementsLoading
  }  
}

export default connect(mapStateToProps, { fetchMeasurements })(Sensor)