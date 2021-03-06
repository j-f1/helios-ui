import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavLink from './NavLink'
import BulletedNav from './BulletedNav'
import Notifications from './notifications/'
import Lists from './list/ListNav'
import List from './list/'
import Footer from './Footer'

import { Provider } from './token-context'
import { se, backend } from './api'

import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.state = {
      token: localStorage.seToken || null,
      tokenInfo: null,
      chatAccounts: [],
    }
  }
  componentDidMount() {
    if (this.state.token) {
      this.loadUser(this.state.token).catch(console.error)
    }
  }
  logIn() {
    const origin = location.protocol + '//' + location.host
    window.open(
      `https://stackoverflow.com/oauth/dialog?client_id=${
        process.env.REACT_APP_CLIENT_ID
      }&scope=&redirect_uri=${origin}/login.html`,
    )
    window.addEventListener(
      'message',
      event => {
        if (event.origin === origin) {
          const token = String(event.data)
          localStorage.seToken = token
          this.setState({ token })
          event.source.close()

          this.loadUser(token).catch(console.error)
        }
      },
      { once: true },
    )
  }
  async loadUser(token) {
    const {
      items: [tokenInfo],
    } = await se(`access-tokens/${token}?access_token=${token}`)
    this.setState({ tokenInfo })
    const chatAccounts = await backend(
      `user/${tokenInfo.account_id}/chat-accounts`,
    )
    this.setState({ chatAccounts })
  }
  logOut() {
    delete localStorage.seToken
    this.setState({ token: null, tokenInfo: null, chatAccounts: [] })
  }
  render() {
    return (
      <Provider
        value={{
          token: this.state.token,
          tokenInfo: this.state.tokenInfo,
          chatAccounts: this.state.chatAccounts,
        }}
      >
        <Router>
          <main>
            <header>
              <h1>
                Helios Frontend{' '}
                <sup>
                  <sup>&beta;</sup>
                </sup>
                {this.state.token ? (
                  <button onClick={this.logOut}>Log Out</button>
                ) : (
                  <button onClick={this.logIn}>Log In</button>
                )}
              </h1>
              <BulletedNav
                links={[
                  <NavLink to="/notifications">Notifications</NavLink>,
                  <NavLink to="/lists">Lists</NavLink>,
                ]}
              />
            </header>
            <div className="content">
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path="/lists" component={Lists} />
              <Route path="/list/" component={Lists} />
              <Route exact path="/list/:type" component={List} />
            </div>
            <Footer />
          </main>
        </Router>
      </Provider>
    )
  }
}
