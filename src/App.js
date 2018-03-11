import React, { Component } from 'react';
import DashBoard from './DashBoard'

class App extends Component {
  constructor(props) {
    super(props) 
    const currentUser = {
      name: ''
    }
    this.state = {
      currentUser,
      currentStatus: null,
      titles: [{name:'Title', content: 'eieieiieieie'},]
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
    window.FB.login(this.checkCurrentStatus, {scope: 'user_photos'})
  }

  logout = () => {
    window.FB.logout(this.checkCurrentStatus)
  }

  addTitle = ()=> {
    this.state.titles.push({name:'Title222', content:'wdwdasdwawdasdwas'})
    this.setState({ titles:this.state.titles })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.currentStatus ?
          <div>
            <DashBoard 
              titles={ this.state.titles }
              addTitle={ this.addTitle }
            />
            
            <button onClick={ this.profile }>Profile</button>
            <button onClick={ this.logout }>logout</button>
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
