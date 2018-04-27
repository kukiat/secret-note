import React, { Component } from 'react';
import DashBoard from './container/DashBoard'
import Home from './components/Home'
import styled from 'styled-components'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      FbResponse: null,
      userId: null,
      currentStatus: null,
      loading: true
    }
  }

  componentDidMount() {
    window.resolveFuckingAsynchronous
    .then(FB => FB.getLoginStatus(this.checkCurrentStatus))
  }

  checkCurrentStatus = (res) => {
    if(res.status === 'connected') {
      this.setState({ 
        FbResponse: res,
        currentStatus: true,
        userId: res.authResponse.userID,
        loading: false
      })
    }else {
      this.setState({ currentStatus: false, userId: null, FbResponse: null, loading: false })
    }
  }

  login = () => {
    window.FB.login(this.checkCurrentStatus, {scope: 'user_friends'})
  }

  logout = () => {
    window.FB.logout(this.checkCurrentStatus)
  }

  render() {
    const { userId, currentStatus, FbResponse, loading } = this.state
    return (
      <div className="app">
        <Title>Secret Note</Title>
        { loading ? null
          : <div>
              { currentStatus ?
                <DashBoard userId = { userId } FbResponse = { FbResponse } logout = { this.logout } />
                : <Home login={ this.login }/>
              }
          </div>
        }
      </div>
    )

  }
}

const Title = styled.div`
  font-size: 50px;
  text-align: center;
  margin-bottom: 30px;
`

export default App;
