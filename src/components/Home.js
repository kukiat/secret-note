import React from 'react'
import styled from 'styled-components'

const Home = (props) => {
  return (
    <div className="">
      <Title>Secret Note</Title>
      <FbButton onClick={ props.login }>
        <FbIcon>F</FbIcon> 
        <span>Login with Facebook</span>
      </FbButton>
    </div>
  )
}

const Title = styled.div`
  font-size: 50px;
  text-align: center;
  margin-bottom: 30px;
`

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