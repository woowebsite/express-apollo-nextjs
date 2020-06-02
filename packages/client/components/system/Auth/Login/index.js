import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Radio, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

@Form.create()
@connect(({ user, settings }) => ({ user, authProvider: settings.authProvider, logo: settings.logo }))
class Login extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/LOGIN',
          payload: values,
        })
      }
    })
  }

  changeAuthProvider = value => {
    const { dispatch } = this.props
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'authProvider',
        value,
      },
    })
  }

  render() {
    const {
      form,
      user: { loading },
      authProvider,
      logo,
    } = this.props

    return (
      <div>
        <div className="text-center mb-5">
          <h1 className="mb-5">
            <strong>Welcome to {logo}</strong>
          </h1>
          <p>
            Pluggable enterprise-level application framework.
            <br />
            An excellent front-end solution for web applications built upon Ant Design.
            <br />
            Credentials for testing purposes - <strong>admin@mediatec.org</strong> /{' '}
            <strong>cleanui</strong>
          </p>
        </div>
        <div className={`card ${style.container}`}>
          <div className="text-dark font-size-24 mb-3">
            <strong>Sign in to your account</strong>
          </div>
          <div className="mb-4">
            <Radio.Group
              onChange={e => this.changeAuthProvider(e.target.value)}
              value={authProvider}
            >
              <Radio value="firebase">Firebase</Radio>
              <Radio value="jwt">JWT</Radio>
              <Tooltip placement="right" title="Soon">
                <Radio value="auth0" disabled>
                  Auth0
                </Radio>
              </Tooltip>
            </Radio.Group>
          </div>
          <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit} className="mb-4">
            <Form.Item>
              {form.getFieldDecorator('email', {
                initialValue: 'admin@mediatec.org',
                rules: [{ required: true, message: 'Please input your e-mail address' }],
              })(<Input size="large" placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                initialValue: 'cleanui',
                rules: [{ required: true, message: 'Please input your password' }],
              })(<Input size="large" type="password" placeholder="Password" />)}
            </Form.Item>
            <Button
              type="primary"
              size="large"
              className="text-center w-100"
              htmlType="submit"
              loading={loading}
            >
              <strong>Sign in</strong>
            </Button>
          </Form>
          <Link to="/auth/forgot-password" className="kit__utils__link font-size-16">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center pt-2 mb-auto">
          <span className="mr-2">Don't have an account?</span>
          <Link to="/auth/register" className="kit__utils__link font-size-16">
            Sign up
          </Link>
        </div>
      </div>
    )
  }
}

export default Login
