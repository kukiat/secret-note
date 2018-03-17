import React from 'react'
import styled, { keyframes } from 'styled-components'

export const Modal = (C) => (props) => {
  return(
    <WrapModal visible={props.visible}>
      <ModalRemove visible={props.visible}>
        <C {...props}/>
      </ModalRemove>
    </WrapModal>
  )
}

export const RemoveBody = (props) => {
  return (
    <ModalBody>
      <div className="modal-close" onClick={ () => props.closeModal('REMOVE_MODAL') }>X</div>
      <div className="modal-title">WARNING !!</div>
      <div className="modal-header">If you remove. This note will destroy.</div>
      <div className="modal-btn">
        <ButtonModal onClick={ props.removeTitle } column="2" color="#7CFC00">OK</ButtonModal>
        <ButtonModal onClick={ () => props.closeModal('REMOVE_MODAL') } column="4" color="#DC143C">Cancle</ButtonModal>
      </div>
    </ModalBody>
  )
}

export const ShareBody = (props) => {
  return (
    <ModalBody>
      <div className="modal-close" onClick={ () => props.closeModal('SHARE_MODAL') }>X</div>
      <div className="modal-title">SHARE</div>
      <div className="modal-header"><InputText placeholder="friend url"/></div>
      <div className="modal-btn">
        <ButtonModal column="2" color="#7CFC00">OK</ButtonModal>
        <ButtonModal onClick={ () => props.closeModal('REMOVE_MODAL') } column="4" color="#DC143C">Cancle</ButtonModal>
      </div>
    </ModalBody>
  )
}

const InputText = styled.input.attrs({
  type: 'text',
  autoFocus: true
})`
  border-radius: 5px;
  width: 80%;
  font-size: 16px;
  height: 30px;
  background: rgb(23,44,56);
  color: #FFFFFF;
  border: 1px solid rgb(23,44,56);
  padding :0 0 0 10px;
`

const ModalBody = styled.div`
  display: grid;
  grid-template-rows: 5% 25% 35% 30%;
  height: 100%;
  .modal-close {
    color: #FFFFFF;
    grid-row: 1;
    font-size: 14px;
    cursor: pointer;
    padding: 5px 0px 0px 330px;
    font-weight: 700;
    &:hover {
      color: rgb(219, 217, 217);
    }
  }
  .modal-title {
    text-align: center;
    grid-row: 2;
    padding: 7px 0px 0px 0px;
    color: rgb(187, 26, 26);
    font-weight: bold;
    border-bottom: solid 1px #FFFFFF;
  }
  .modal-header {
    grid-row: 3;
    text-align: center;
    margin-top: 20px;
  }
  .modal-btn {
    grid-row: 4;
    display: grid;
    grid-template-columns: 10% 35% 10% 35% 10%;
  }
`

export const Btn = (props) => {
  return `
    font-size: 14px;
    font-weight: 250;
    width:60px;
    height: 24px;
    text-align: center;
    color: ${props.color};
    border: 1px solid ${props.color};
    border-radius: 10px;
    padding-top:5px;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover{
      background: #202020;
    }
  `
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
  from { top:-300px; opacity:0}
  to {top:0; opacity:1}
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

const ButtonModal = styled.a`
  ${ props => Btn(props)};
  grid-column: ${props => props.column};
  width: 100px;
`

