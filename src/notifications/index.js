import React, { Component } from 'react'
import get from '../api'
import { Consumer } from '../token-context'

export default props => <Consumer>{value => <Notifications {...props} {...value} />}</Consumer>

class Notifications extends Component {
  state = {
    loading: true,
  }
  componentDidMount() {
    this.loadData().catch(err => console.log(err))
  }
  async loadData() {
    const response = await get('/notifications')
    this.setState({
      loading: false,
      notifications: response.items,
    })
  }
  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    } else {
      return (
        <ul>
          {this.state.notifications.map((n, i) => (
            <li key={i}>
              {n.user_id} on {n.server} in room #{n.room_id} for {n.site}
            </li>
          ))}
        </ul>
      )
    }
  }
}
