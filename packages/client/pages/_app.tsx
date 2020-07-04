import App, { AppInitialProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux, { AppProps } from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import createStore from '../store';

import '../assets/global.scss'
import 'antd/dist/antd.css';

class MyApp extends React.Component<AppProps & AppInitialProps> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp))
