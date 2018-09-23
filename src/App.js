import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavLink from './NavLink'
import BulletedNav from './BulletedNav'
import Notifications from './notifications/'
import Lists from './list/ListNav'
import List from './list/'
import Footer from './Footer'

import { Provider } from './token-context'

import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.state = { token: localStorage.seToken || null }
  }
  logIn() {
    const origin = location.protocol + '//' + location.host
    window.open(
      `https://stackoverflow.com/oauth/dialog?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=&redirect_uri=${origin}/login.html`,
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
    const res = await fetch(`https://api.stackexchange.com/2.2/access-tokens/${token}?key=${process.env.REACT_APP_KEY}&access_token=${token}`)
    this.setState({ tokenInfo: await res.json().items[0] })
  }
  logOut() {
    delete localStorage.seToken
    this.setState({ token: null, tokenInfo: null })
  }
  render() {
    return (
      <Provider value={{ token: this.state.token, tokenInfo: this.state.tokenInfo }}>
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
