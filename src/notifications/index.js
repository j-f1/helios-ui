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
      const { mine, other } = this.state.notifications.reduce((state, n) => {
        const isMine = this.props.chatAccounts.find(account => account.id === n.user_id && account.server === n.server)
        ;(isMine ? state.mine : state.other).push(n)
        return state
      }, { mine: [], other: [] })
      return (
        <div>
          {mine.length ? (
            <section>
              <h2>Your notifications</h2>
              <ul>
                {mine.map((n, i) => {
                  return (
                    <li key={i}>
                      Room #{n.room_id} on {n.server} for {n.site}
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}
          {other.length ? (
            <section>
              <h2>Other notifications</h2>
              <ul>
                {other.map((n, i) => {
                  return (
                    <li key={i}>
                      User #{n.user_id} in room #{n.room_id} on {n.server} for {n.site}
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}
        </div>
      )
    }
  }
}
