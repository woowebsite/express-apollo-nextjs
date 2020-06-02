import React from 'react'
import Sparkline from '@rowno/sparkline'
import style from './style.module.scss'

class Chart11v1 extends React.Component {
  render() {
    const options = {
      width: 120,
      height: 110,
      lines: [
        {
          values: [20, 80, 67, 120, 132, 66, 97],
          colors: {
            area: 'rgba(75,124,243, 0.1)',
            line: '#4b7cf3',
          },
        },
      ],
    }

    return (
      <div className="card-body overflow-hidden position-relative">
        <div className="font-size-36 font-weight-bold text-dark mb-n2">$256.12</div>
        <div className="text-uppercase">income</div>
        <div className={style.chartContainer}>
          <div className={style.chart}>
            <Sparkline {...options} />
          </div>
        </div>
      </div>
    )
  }
}

export default Chart11v1
