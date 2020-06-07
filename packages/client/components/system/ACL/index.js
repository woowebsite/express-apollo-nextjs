import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { history } from '../../../index'
import { notification } from 'antd'

@connect(({ user }) => ({ user }))
class ACL extends React.PureComponent {
  UNSAFE_componentWillMount() {
    const {
      user: { role },
      redirect = false,
      defaultRedirect = '/auth/404',
      roles = [],
    } = this.props
    const authorized = roles.includes(role)
    // if user not equal needed role and if component is a page - make redirect to needed route
    if (!authorized && redirect) {
      const url = typeof redirect === 'boolean' ? defaultRedirect : redirect
      notification.error({
        message: 'Unauthorized Access',
        description: (
          <div>
            You have no rights to access this page.
            <br />
            Redirected to "{url}"
          </div>
        ),
      })
      history.push(url)
    }
  }

  render() {
    const {
      user: { role },
      children,
      roles = [],
    } = this.props
    const authorized = roles.includes(role)
    const AuthorizedChildren = () => {
      // if user not authorized return null to component
      if (!authorized) {
        return null
      }
      // if access is successful render children
      return <Fragment>{children}</Fragment>
    }

    return AuthorizedChildren()
  }
}

export default ACL
