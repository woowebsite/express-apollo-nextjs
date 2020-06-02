import React from 'react'
import { injectIntl } from 'react-intl'
import { Input, Icon, Checkbox } from 'antd'
import style from './style.module.scss'

@injectIntl
class Search extends React.Component {
  state = {
    showSearch: false,
    searchText: '',
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  showLiveSearch = () => {
    setTimeout(() => {
      this.searchInput.focus()
    }, 100)
    this.setState({
      showSearch: true,
    })
  }

  changeSearchText = e => {
    this.setState({
      searchText: e.target.value,
    })
  }

  hideLiveSearch = () => {
    this.searchInput.blur()
    this.setState({
      showSearch: false,
      searchText: '',
    })
  }

  handleKeyDown = event => {
    const { showSearch } = this.state
    if (showSearch) {
      const key = event.keyCode.toString()
      if (key === '27') {
        this.hideLiveSearch()
      }
    }
  }

  handleNode = node => {
    this.searchInput = node
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props
    const { showSearch, searchText } = this.state
    return (
      <div className="d-inline-block mr-4">
        <Input
          className={style.extInput}
          placeholder={formatMessage({ id: 'topBar.typeToSearch' })}
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          style={{ width: 200 }}
          onFocus={this.showLiveSearch}
        />
        <div
          className={`${
            showSearch ? `${style.livesearch} ${style.livesearchVisible}` : style.livesearch
          }`}
          id="livesearch"
        >
          <button className={style.close} type="button" onClick={this.hideLiveSearch}>
            <i className="icmn-cross" />
          </button>
          <div className="container-fluid">
            <div className={style.wrapper}>
              <input
                type="search"
                className={style.searchInput}
                value={searchText}
                onChange={this.changeSearchText}
                id="livesearchInput"
                placeholder={formatMessage({ id: 'topBar.typeToSearch' })}
                ref={this.handleNode}
              />
              <ul className={style.options}>
                <li className={style.option}>
                  <Checkbox checked>Search within app</Checkbox>
                </li>
                <li className={style.option}>Press enter to search</li>
              </ul>
              {!searchText && (
                <div className={style.results}>
                  <div className={style.resultsTitle}>
                    <span>No Results Found</span>
                  </div>
                </div>
              )}
              {searchText && (
                <div className={style.results}>
                  <div className={style.resultsTitle}>
                    <span>Pages Search Results</span>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className={style.resultContent}>
                        <div
                          className={style.resultThumb}
                          style={{ backgroundImage: 'url(resources/images/content/photos/1.jpeg)' }}
                        >
                          #1
                        </div>
                        <div className={style.result}>
                          <div className={style.resultText}> Samsung Galaxy A50 4GB/64GB</div>
                          <div className={style.resultSource}>In some partition</div>
                        </div>
                      </div>
                      <div className={style.resultContent}>
                        <div
                          className={style.resultThumb}
                          style={{ backgroundImage: 'url(resources/images/content/photos/2.jpeg)' }}
                        >
                          KF
                        </div>
                        <div className={style.result}>
                          <div className={style.resultText}>Apple iPhone 11 64GB</div>
                          <div className={style.resultSource}>In some partition</div>
                        </div>
                      </div>
                      <div className={style.resultContent}>
                        <div
                          className={style.resultThumb}
                          style={{ backgroundImage: 'url(resources/images/content/photos/3.jpeg)' }}
                        >
                          GF
                        </div>
                        <div className={style.result}>
                          <div className={style.resultText}>
                            Samsung Galaxy A51 SM-A515F/DS 4GB/64GB
                          </div>
                          <div className={style.resultSource}>In some partition</div>
                        </div>
                      </div>
                      <div className={style.resultContent}>
                        <div
                          className={style.resultThumb}
                          style={{ backgroundImage: 'url(resources/images/content/photos/4.jpeg)' }}
                        >
                          QT
                        </div>
                        <div className={style.result}>
                          <div className={style.resultText}>Xiaomi Redmi 8 4GB/64GB</div>
                          <div className={style.resultSource}>In some partition</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className={style.resultContent}>
                        <div className={style.resultThumb}>01</div>
                        <div className={style.result}>
                          <div className={style.resultText}>White Case</div>
                          <div className={style.resultSource}>In some partition</div>
                        </div>
                      </div>
                      <div className={style.resultContent}>
                        <div className={style.resultThumb}>02</div>
                        <div className={style.result}>
                          <div className={style.resultText}>Blue Case</div>
                          <div className={style.resultSource}>In some partition</div>
                        </div>
                      </div>
                      <div className={style.resultContent}>
                        <div className={style.resultThumb}>03</div>
                        <div className={style.result}>
                          <div className={style.resultText}>Green Case</div>
                          <div className={style.resultSource}>In some partition</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search
