import React, { Component } from 'react'
import { helios } from '../api'

export default class List extends Component {
  state = {
    loading: true,
  }
  componentDidMount() {
    this.loadData().catch(err => console.log(err))
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type) {
      this.setState({ loading: true })
      this.loadData().catch(err => console.log(err))
    }
  }
  async loadData() {
    const { items } = await helios('blacklists/' + this.props.match.params.type)
    this.setState({
      loading: false,
      items,
    })
  }
  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    } else {
      return (
        <ul>
          {this.state.items.map((item, i) => (
            <li key={i}>
              <code>{item}</code>
            </li>
          ))}
        </ul>
      )
    }
  }
}
