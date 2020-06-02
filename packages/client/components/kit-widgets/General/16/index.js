import React from 'react'
import style from './style.module.scss'

class General16 extends React.Component {
  state = {
    isFavourite: false,
  }

  componentDidMount() {
    const { isFavourite } = this.props

    this.setState({
      isFavourite,
    })
  }

  setFavourite = e => {
    e.preventDefault()
    const { isFavourite } = this.state
    this.setState({
      isFavourite: !isFavourite,
    })
  }

  render() {
    const { isNew, image, name, price, oldPrice } = this.props

    const { isFavourite } = this.state

    return (
      <div className="card overflow-hidden">
        <div hidden={!isNew} className={style.new}>
          New
        </div>
        <div className="card-body">
          <a
            role="menuitem"
            className={`${style.favourite} ${isFavourite ? 'text-dark' : 'text-gray-3'}`}
            onClick={this.setFavourite}
            onKeyPress={this.setFavourite}
            tabIndex="0"
          >
            <i className="fe fe-heart font-size-21" />
          </a>
          <div className={`${style.image} border-bottom height-250 mb-3`}>
            <img className="img-fluid" src={image} alt={name} />
          </div>
          <div className="font-size-24 font-weight-bold text-dark mb-2">
            {price}{' '}
            <del hidden={!oldPrice} className="align-text-top font-size-14">
              {oldPrice}
            </del>
          </div>
          <div>
            <a className="text-blue font-size-18">{name}</a>
          </div>
        </div>
      </div>
    )
  }
}

export default General16
