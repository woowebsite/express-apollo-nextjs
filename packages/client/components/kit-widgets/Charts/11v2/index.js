import React from 'react'
import Sparkline from '@rowno/sparkline'
import style from './style.module.scss'

class Chart11v2 extends React.Component {
  render() {
    const options = {
      width: 120,
      height: 110,
      lines: [
        {
          values: [42, 40, 80, 67, 84, 20, 97],
          colors: {
            area: 'rgba(75,124,243, 0.1)',
            line: '#4b7cf3',
          },
        },
      ],
    }

    return (
      <div className="card-body overflow-hidden position-relative">
        <div className="font-size-36 font-weight-bold text-dark mb-n2">$56.12</div>
        <div className="text-uppercase">Outcome</div>
        <div className={style.chartContainer}>
          <div className={style.chart}>
            <Sparkline {...options} />
          </div>
        </div>
      </div>
    )
  }
}

export default Chart11v2
