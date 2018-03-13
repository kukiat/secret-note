import React from 'react'
import styled, { keyframes } from 'styled-components'

export const Modal = (props) => {
  return(
    <WrapModal visible={props.visible}>
      <ModalRemove>
        <div className="modal-content-detail">
          <div className="close" onClick={ props.closeModal }>X</div>
          <div className="modal-title">WARNING !!</div>
          <div className="modal-header">If you remove. This note will destroy.</div>
          <div className="modal-btn">
            <ButtonModal onClick={ props.removeTitle } column="2" color="#7CFC00">OK</ButtonModal>
            <ButtonModal onClick={ props.closeModal } column="4" color="#DC143C">Cancle</ButtonModal>
          </div>
        </div>
      </ModalRemove>
    </WrapModal>
  )
}

const WrapModal = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  padding-top: 150px; 
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`
const animatationTop = keyframes`
  from {
    top:-300px; 
    opacity:0
  }
  to {
    top:0; 
    opacity:1
  }
`


const ModalRemove  = styled.div`
  background: #121212;
  border-radius: 5px;
  position: relative;
  margin: auto;
  padding: 0;
  border: 1px solid #FFFFFF;
  width: 350px;
  height: 180px;
  animation-name: ${animatationTop};
  animation-duration: 0.4s
`

const Button = styled.a`
  font-size: 14px;
  font-weight: 250;
  width:60px;
  height: 24px;
  text-align: center;
  color: ${props => props.color};
  border: 1px solid ${props => props.color};
  border-radius: 10px;
  padding-top:5px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover{
    background: #202020;
  }
`

const ButtonModal = Button.extend`
  grid-column: ${props => props.column};
  width: 100px;
`