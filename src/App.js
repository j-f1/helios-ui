import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavLink from './NavLink'
import BulletedNav from './BulletedNav'
import Notifications from './notifications/'
import Lists from './list/ListNav'
import List from './list/'
import Footer from './Footer'

import { Provider } from  './token-context'

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
    window.open('https://stackoverflow.com/oauth/dialog?client_id=13058&scope=&redirect_uri=' + origin + '/login.html')
    window.addEventListener('message', event => {
      if (event.origin === origin) {
        const token = String(event.data)
        localStorage.seToken = token
        this.setState({ token })
        event.source.close()
      }
    }, { once: true })
  }
  logOut() {
    delete localStorage.seToken
    this.setState({ token: null })
  }
  render() {
    return (
      <Provider value={this.state.token}>
        <Router>
          <main>
            <header>
              <h1>
                Helios Frontend <sup><sup>&beta;</sup></sup>
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
