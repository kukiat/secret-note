import React from 'react'
import styled from 'styled-components'

class Home extends React.Component{
  render() {
    return (
      <div className="gg">
        <div className="head-title" >Secret Note</div>
        <FbButton onClick={ this.props.login }>
          <FbIcon>F</FbIcon> 
          <span>Login with Facebook</span>
        </FbButton>
      </div>
    )
  }
}

const FbIcon =styled.span`
  margin-right :10px;
  font-size:18px;
  font-weight: 900;
`
const FbButton = styled.div`
  width: 350px;
  height: 30px;
  background: #4B68AD;
  border-radius: 5px;
  font-size:16px;
  color: #FFFFFF;
  cursor:pointer;
  margin: auto;
  padding-top: 10px;
  text-align:center;
`
export default Home