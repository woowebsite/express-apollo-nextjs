import React from 'react'
import { Doughnut } from 'react-chartjs-2'

import data from './data.json'
import style from './style.module.scss'

class Chart10 extends React.Component {
  constructor(props) {
    super(props)
    this.tooltip = React.createRef()
    this.tooltipLabel = React.createRef()
    this.tooltipValue = React.createRef()
    this.myRef = null
    this.createMarkup = this.createMarkup.bind(this)
  }

  state = {
    legend: undefined,
  }

  componentDidMount() {
    const leg = this.generateLegend()
    this.setState({ legend: leg })
  }

  setChartRef(element) {
    this.myRef = element
  }

  generateLegend() {
    if (!this.myRef) return null
    return this.myRef.chartInstance.generateLegend()
  }

  createMarkup() {
    const { legend } = this.state
    return { __html: legend }
  }

  render() {
    const options = {
      animation: false,
      responsive: true,
      cutoutPercentage: 70,
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
        custom: tooltipData => {
          const tooltipEl = this.tooltip.current
          tooltipEl.style.opacity = 1
          if (tooltipData.opacity === 0) {
            tooltipEl.style.opacity = 0
          }
        },
        callbacks: {
          label: (tooltipItem, itemData) => {
            const dataset = itemData.datasets[0]
            const value = dataset.data[tooltipItem.index]
            this.tooltipValue.current.innerHTML = value
            this.tooltipLabel.current.innerHTML = itemData.labels[tooltipItem.index]
          },
        },
      },
      legendCallback: chart => {
        const { labels } = chart.data
        let legendMarkup = []
        const dataset = chart.data.datasets[0]
        legendMarkup.push('<div class="kit__c9__chartLegend flex-shrink-0">')
        let legends = labels.map((label, index) => {
          const color = dataset.backgroundColor[index]
          return `<div class="d-flex align-items-center flex-nowrap mt-2 mb-2"><div class="tablet mr-3" style="background-color: ${color}"></div>${label}</div>`
        })
        legends = legends.join('')
        legendMarkup.push(legends)
        legendMarkup.push('</div>')
        legendMarkup = legendMarkup.join('')
        return legendMarkup
      },
    }

    return (
      <div>
        <div className="text-dark font-size-18 font-weight-bold mb-1">Profit Change</div>
        <div className="text-gray-6 mb-2">Revenue by location and date</div>
        <div className="d-flex flex-wrap align-items-center">
          <div className="mr-3 mt-3 mb-3 position-relative">
            <Doughnut
              ref={element => this.setChartRef(element)}
              data={data}
              options={options}
              width={140}
              height={140}
            />
            <div
              className={`${style.tooltip} text-gray-5 font-size-28 text-center`}
              ref={this.tooltip}
            >
              <div className="font-size-14 font-weight-bold text-dark" ref={this.tooltipLabel} />
              <div className="font-size-14 text-dark" ref={this.tooltipValue} />
            </div>
          </div>
          <div dangerouslySetInnerHTML={this.createMarkup()} />
        </div>
      </div>
    )
  }
}

export default Chart10
