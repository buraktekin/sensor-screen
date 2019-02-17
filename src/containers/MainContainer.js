import React, { Component } from 'react'
import { Dropdown, Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getSensors } from '../actions/SensorActions'
import Item from '../components/Card'

class MainContainer extends Component {

  dataFormat = (data) => {
    const formattedData = [];
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

  componentDidMount() {
    this.props.getSensors();
  }

  render() {
    const { sensors, error, isLoading } = this.props
    return (
      <React.Fragment>
        <Segment raised>
          <Grid className='grid-row-3' divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <div className='header'>
                  <img className='header--icon' src="https://img.icons8.com/nolan/50/000000/online.png" alt='icon logo'/>
                  <div className='company'>
                    <h1 className='company--name'>FAZLAGIDA</h1>
                    <h4 className='company--prefix'>Sensors </h4>
                  </div>
                </div>
              </Grid.Column>

              <Grid.Column>
                <Dropdown placeholder='Filter Sensors' fluid search selection options={this.dataFormat(sensors)} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <div className='content'></div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column className='ui sensors'>
                {<div className='ui horizontal-container'>
                { error ? <p> { error.message } </p> : null }
                  {!isLoading ? (
                    sensors.sort((a,b) => {
                      return new Date(a.aliveTime).getTime() - 
                          new Date(b.aliveTime).getTime()
                    }).reverse().map( sensor => {
                      return (
                        <Grid.Column id={ sensor.id }>
                          <Item sensor={ sensor } />
                        </Grid.Column>
                      );
                    })
                  ) : (
                    <div className='loading-container'>
                      <h3> Loading... </h3>
                    </div>
                  )}
                </div>}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    sensors: state.sensorReducers.sensors,
    error: state.sensorReducers.error,
    isLoading: state.sensorReducers.isLoading
  }
}


export default connect(
  mapStateToProps,
  { getSensors }
) (MainContainer);