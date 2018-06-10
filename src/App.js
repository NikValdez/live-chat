import React, { Component } from 'react'
import axios from 'axios'
import Pusher from 'pusher-js'
import ChatList from './components/ChatList/ChatList'
import ChatBox from './components/ChatBox/ChatBox'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      username: '',
      chats: []
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  componentDidMount() {
    const username = window.prompt('Username: ', 'Anonymous')
    this.setState({ username })
    const pusher = new Pusher('28982d94b53fc029355e', {
      cluster: 'us2',
      encrypted: true
    })
    const channel = pusher.subscribe('chat')
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' })
    })
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text
      }
      axios.post('http://localhost:5000/message', payload)
    } else {
      this.setState({ text: e.target.value })
    }
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.setState({ text: '' })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Live Chat</span>
        </nav>
        <div className="container">
          <h4 className="greetings">Hello, {this.state.username}</h4>
          <div className="row">
            <div className="col-md-6 offset-md-2">
              <ChatList chats={this.state.chats} />
            </div>
            <div className="col-md-6">
              <ChatBox
                text={this.state.text}
                username={this.state.username}
                handleTextChange={this.handleTextChange}
                onFormSubmit={this.onFormSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
