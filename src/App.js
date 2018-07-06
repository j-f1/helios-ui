import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavLink from './NavLink'
import BulletedNav from './BulletedNav'
import Notifications from './notifications/'
import Lists from './list/ListNav'
import List from './list/'
import Footer from './Footer'

import './App.css'

export default class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <header>
            <h1>Helios Frontend <sup><sup>&beta;</sup></sup></h1>
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
    )
  }
}
