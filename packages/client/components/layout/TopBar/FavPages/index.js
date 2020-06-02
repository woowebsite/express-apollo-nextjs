import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { Dropdown, Input, Tooltip, message } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import store from 'store'
import style from './style.module.scss'

const mapStateToProps = ({ menu }) => ({
  menuData: menu.menuData,
})

@injectIntl
@connect(mapStateToProps)
class FavPages extends React.Component {
  state = {
    searchText: '',
    favs: store.get('app.topbar.favs') || [],
    pagesList: [],
  }

  componentDidMount() {
    const pagesList = () => {
      const { menuData = [] } = this.props
      const _menuData = JSON.parse(JSON.stringify(menuData))
      const flattenItems = (items, key) =>
        items.reduce((flattenedItems, item) => {
          if (item.category) {
            return flattenedItems
          }
          if (item.key === 'nestedItem1' || item.disabled) {
            // skip unwanted items
            return flattenedItems
          }
          if (Array.isArray(item[key])) {
            const items = item[key].map(child => {
              child.icon = item.icon
              return child
            })
            return flattenedItems.concat(flattenItems(items, key))
          }
          flattenedItems.push(item)
          return flattenedItems
        }, [])
      return flattenItems(_menuData, 'children')
    }
    this.setState({
      pagesList: pagesList(),
    })
  }

  changeSearchText = e => {
    this.setState({
      searchText: e.target.value,
    })
  }

  setFav = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    const { favs } = this.state
    const isActive = favs.some(child => child.url === item.url)
    if (isActive) {
      const filtered = favs.filter(child => child.url !== item.url)
      store.set('app.topbar.favs', filtered)
      this.setState({
        favs: filtered,
      })
      return
    }
    if (favs.length >= 3) {
      message.info('Only three pages can be added to your bookmarks.')
      return
    }
    let items = [...favs]
    items.push(item)
    store.set('app.topbar.favs', items)
    this.setState({
      favs: items,
    })
  }

  generatePageList = searchText => {
    const { pagesList, favs } = this.state
    const _searchText = searchText ? searchText.toUpperCase() : ''
    return pagesList.map(item => {
      const isActive = favs.some(child => child.url === item.url)
      if (!item.title.toUpperCase().includes(_searchText) && _searchText) {
        return null
      }
      return (
        <Link to={item.url} className={style.link} key={item.key}>
          <div
            className={`${style.setIcon} ${isActive ? style.setIconActive : ''}`}
            onClick={e => this.setFav(e, item)}
          >
            <i className="fe fe-star" />
          </div>
          <span>
            <i className={`mr-2 fe ${item.icon}`} />
            {item.title}
          </span>
        </Link>
      )
    })
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props
    const { searchText, favs } = this.state
    const list = this.generatePageList(searchText)

    const menu = (
      <React.Fragment>
        <div className="card cui__utils__shadow width-300">
          <div className="card-body p-1 ">
            <div className="p-2">
              <Input
                placeholder={formatMessage({ id: 'topBar.findPages' })}
                value={searchText}
                onChange={this.changeSearchText}
                allowClear
              />
            </div>
            <div className="height-200">
              <Scrollbars
                autoHide
                renderThumbVertical={({ ...props }) => (
                  <div
                    {...props}
                    style={{
                      width: '4px',
                      borderRadius: 'inherit',
                      backgroundColor: '#c5cdd2',
                      left: '1px',
                    }}
                  />
                )}
              >
                <div className="px-2 pb-2">{list}</div>
              </Scrollbars>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
    return (
      <div className={style.container}>
        {favs.map(item => {
          return (
            <Tooltip key={item.key} placement="bottom" title={item.title}>
              <Link to={item.url} className={`${style.item} mr-2`}>
                <i className={`${style.icon} fe ${item.icon}`} />
              </Link>
            </Tooltip>
          )
        })}
        <Tooltip placement="bottom" title="Bookmarks">
          <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
            <span className={style.item}>
              <i className={`${style.icon} fe fe-star`} />
            </span>
          </Dropdown>
        </Tooltip>
      </div>
    )
  }
}

export default FavPages
