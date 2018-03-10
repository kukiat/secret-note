import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props) 
    const currentUser = {
      name: ''
    }
    this.state = {
      currentUser,
      currentStatus: null
    }
  }

  async componentDidMount() {
    const FB = await window.resolveFuckingAsynchronous
    FB.getLoginStatus(this.checkCurrentStatus)
  }

  checkCurrentStatus = (res) => {
    if(res.status === 'connected') {
      this.setState({ currentStatus: true })
    }else {
      this.setState({ currentStatus: false })
    }
  }

  login = () => {
    window.FB.login(this.checkCurrentStatus)
  }

  logout = () => {
    window.FB.logout(this.checkCurrentStatus)
  }

  render() {
    console.log(this.state.currentStatus)
    return (
      <div className="App">
        <div className="head-title" >Secret Note</div>
        {
          this.state.currentStatus ?
          <button onClick={ this.logout }>logout</button>
          : <button onClick={ this.login }>Login</button>
        }
      </div>
    );
  }
}

export default App;
