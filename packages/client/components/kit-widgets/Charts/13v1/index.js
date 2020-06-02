import React from 'react'
import ChartistGraph from 'react-chartist'
import Chartist from 'chartist'
import chartData from './data.json'

class Chart13v1 extends React.Component {
  render() {
    const chartOptions = {
      lineSmooth: Chartist.Interpolation.none({
        fillHoles: false,
      }),
      showPoint: true,
      showLine: true,
      showArea: true,
      fullWidth: true,
      showLabel: false,
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      chartPadding: 0,
      low: 0,
    }

    return (
      <div>
        <div className="card-body">
          <div className="font-weight-bold font-size-36 font-weight-bold text-success">
            12,255Gb
          </div>
        </div>
        <div className="position-relative">
          <ChartistGraph
            data={chartData}
            options={chartOptions}
            type="Line"
            className="height-200"
          />
        </div>
      </div>
    )
  }
}

export default Chart13v1
