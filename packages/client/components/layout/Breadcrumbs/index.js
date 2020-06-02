import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduce } from 'lodash'
import styles from './style.module.scss'

const mapStateToProps = ({ menu }) => ({
  menuData: menu.menuData,
})

@withRouter
@connect(mapStateToProps)
class Breadcrumbs extends React.Component {
  state = {
    breadcrumb: [],
  }

  componentDidMount() {
    this.setBreadcrumbs(this.props)
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setBreadcrumbs(newProps)
  }

  setBreadcrumbs = props => {
    const { menuData } = this.props
    this.setState({
      breadcrumb: this.getBreadcrumb(props, menuData),
    })
  }

  getPath(data, url, parents = []) {
    const items = reduce(
      data,
      (result, entry) => {
        if (result.length) {
          return result
        }
        if (entry.url === url) {
          return [entry].concat(parents)
        }
        if (entry.children) {
          const nested = this.getPath(entry.children, url, [entry].concat(parents))
          return (result || []).concat(nested.filter(e => !!e))
        }
        return result
      },
      [],
    )
    return items.length > 0 ? items : [false]
  }

  getBreadcrumb = (props, items) => {
    const [activeMenuItem, ...path] = this.getPath(items, props.location.pathname)

    if (!activeMenuItem) {
      return null
    }
    if (activeMenuItem && path.length) {
      return path.reverse().map((item, index) => {
        if (index === path.length - 1) {
          return (
            <span key={item.key}>
              <span className={styles.arrow} />
              <span>{item.title}</span>
              <span className={styles.arrow} />
              <strong className={styles.current}>{activeMenuItem.title}</strong>
            </span>
          )
        }
        return (
          <span key={item.key}>
            <span className={styles.arrow} />
            <span>{item.title}</span>
          </span>
        )
      })
    }
    return (
      <span>
        <span className={styles.arrow} />
        <strong className={styles.current}>{activeMenuItem.title}</strong>
      </span>
    )
  }

  render() {
    const { breadcrumb } = this.state
    return breadcrumb ? (
      <div className={styles.breadcrumbs}>
        <div className={styles.path}>
          <Link to="/dashboard/alpha">Home</Link>
          {breadcrumb}
        </div>
      </div>
    ) : null
  }
}

export default Breadcrumbs
