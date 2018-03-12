import React, { Component } from 'react';
import DashBoard from './DashBoard'
import firebase from './config'
const db = firebase.database()

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      userId: null,
      currentStatus: null
    }
  }

  async componentDidMount() {
    const FB = await window.resolveFuckingAsynchronous
    FB.getLoginStatus(this.checkCurrentStatus)
  }

  checkCurrentStatus = (res) => {
    if(res.status === 'connected') {
      this.setState({ 
        currentStatus: true,
        userId: res.authResponse.userID
      })
    }else {
      this.setState({ currentStatus: false, userId: null })
    }
  }

  login = () => {
    window.FB.login(this.checkCurrentStatus)
  }

  logout = () => {
    window.FB.logout(this.checkCurrentStatus)
  }

  render() {
    const { userId, currentStatus,titles } = this.state
    return (
      <div className="App">
        {
          currentStatus ?
          <div>
            <DashBoard 
              userId = { userId }
              logout = { this.logout }
            />
          </div>
          : 
          <div>
            <div className="head-title" >Secret Note</div>
            <button onClick={ this.login }>Login</button>
          </div>
        }
      </div>
    );
  }
}

export default App;
