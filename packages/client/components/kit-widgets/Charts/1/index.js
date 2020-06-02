import React from 'react'
import ChartistGraph from 'react-chartist'
import data from './data.json'
import style from './style.module.scss'

const options = {
  seriesBarDistance: 10,
  horizontalBars: true,
  axisY: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
}

class Chart1 extends React.Component {
  render() {
    return (
      <div>
        <div className="d-flex flex-wrap mb-3">
          <div className={style.item}>
            <div className="font-size-18 text-dark font-weight-bold">
              +$12,367.36 <span className="text-success font-size-12 align-text-top">+25%</span>
            </div>
            <div className="text-uppercase text-gray-4">Total sales</div>
          </div>
          <div className={style.item}>
            <div className="font-size-18 text-dark font-weight-bold">
              +$5,367.36 <span className="text-danger font-size-12 align-text-top">-76%</span>
            </div>
            <div className="text-uppercase text-gray-4">Avg. Per Day</div>
          </div>
        </div>
        <ChartistGraph className="height-300" data={data} options={options} type="Bar" />
      </div>
    )
  }
}

export default Chart1
