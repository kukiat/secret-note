import React, { Component } from 'react';
import DashBoard from './components/DashBoard'
import Home from './components/Home'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      FbResponse: null,
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
        FbResponse: res,
        currentStatus: true,
        userId: res.authResponse.userID
      })
    }else {
      this.setState({ currentStatus: false, userId: null, FbResponse: null })
    }
  }

  login = () => {
    window.FB.login(this.checkCurrentStatus,{scope: 'email'})
  }

  logout = () => {
    window.FB.logout(this.checkCurrentStatus)
  }

  render() {
    const { userId, currentStatus, FbResponse } = this.state
    return (
      <div className="App">
        {
          currentStatus ?
          <div>
            <DashBoard 
              userId = { userId }
              FbResponse = { FbResponse }
              // userId = '{ userId }'
              logout = { this.logout }
            />
          </div>
          : 
          <Home login={ this.login }/>
        }
      </div>
    );
  }
}

export default App;
