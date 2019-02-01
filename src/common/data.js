import Highcharts from 'highcharts/highstock'
import moment from 'moment'
// import _ from 'lodash'

export const tempOptions = ( dataset ) => {
  return {
    credits: {
      enabled: false
    },
    title: {
      text: 'Temperature',
      style: {
        color: '#fff'
      }
    },
    chart: {
      backgroundColor: 'transparent',
      zoomType: 'xy'
    },
    xAxis: {
      categories: dataset[0].sort(),
      gridLineWidth: 0,
      labels: {
        style: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        style: {
          color: '#fff'
        }
      },
      labels: {
        style: {
          color: '#fff'
        }
      }
    },
    legend: {
      itemStyle: {
        color: '#FFF'
      }
    },
    plotOptions: {
      series: {
        turboThreshold: 1000
      }
    },
    series: [{
      name: 'Temperature',
      data: dataset[1].sort()
    }]
  }
}