import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

@Form.create()
class ForgotPassword extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        console.log(values)
      }
    })
  }

  render() {
    const { form } = this.props

    return (
      <div>
        <div className={`card ${style.container}`}>
          <div className="text-dark font-size-24 mb-4">
            <strong>Reset Password</strong>
          </div>
          <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit} className="mb-4">
            <Form.Item>
              {form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your e-mail address' }],
              })(<Input size="large" placeholder="Email Address" />)}
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" className="text-center w-100">
              <strong>Reset my password</strong>
            </Button>
          </Form>
          <Link to="/auth/login" className="kit__utils__link font-size-16">
            <i className="fe fe-arrow-left mr-1 align-middle" />
            Go to Sign in
          </Link>
        </div>
      </div>
    )
  }
}

export default ForgotPassword
