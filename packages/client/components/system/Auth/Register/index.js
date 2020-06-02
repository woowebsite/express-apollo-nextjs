import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

@Form.create()
class Register extends React.Component {
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
            <strong>Create your account</strong>
          </div>
          <div className="mb-4">
            <p>
              And start spending more time on your projects and less time managing your
              infrastructure.
            </p>
          </div>
          <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit} className="mb-4">
            <Form.Item>
              {form.getFieldDecorator('fullname', {
                rules: [{ required: true, message: 'Please input your full name' }],
              })(<Input size="large" placeholder="Full Name" />)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your e-mail address' }],
              })(<Input size="large" placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password' }],
              })(<Input size="large" placeholder="Password" />)}
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" className="text-center w-100">
              <strong>Sign up</strong>
            </Button>
          </Form>
          <div>
            <span className="mr-1">By signing up, you agree to the</span>
            <a href="#" onClick={e => e.preventDefault()} className="kit__utils__link">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" onClick={e => e.preventDefault()} className="kit__utils__link">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-center pt-2 mb-auto">
          <span className="mr-2">Already have an account?</span>
          <Link to="/auth/login" className="kit__utils__link font-size-16">
            Sign in
          </Link>
        </div>
      </div>
    )
  }
}

export default Register
