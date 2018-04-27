import React from 'react'
import ReactModal from 'react-modal'
import styled, { keyframes } from 'styled-components'
import ReactDOM from 'react-dom'
import { styleModal } from './StyleModal'
import { CheckBox } from '../svg/checkbox'

export const RemoveBody = (props) => {
  return (
    <ModalBody>
      <div className="modal-title">WARNING !!</div>
      <div className="modal-header">If you remove. This note will destroy.</div>
      <div className="modal-btn">
        <ButtonModal onClick={ props.removeTitle } column="2" color="#7CFC00">OK</ButtonModal>
        <ButtonModal onClick={ () => props.closeModal('REMOVE_MODAL') } column="4" color="#DC143C">Cancle</ButtonModal>
      </div>
    </ModalBody>
  )
}

export class ShareBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      urlFriend: '',
      titles: props.titles
    }
  }

  handleTitleChange = (id, status) => {
    const index = this.state.titles.findIndex((data) => data.id === id)
    // this.setState({
    //   titles: [...this.state.titles, {status: !status}]
    // })
  }

  render() {
    const { titles } = this.state
    console.log(titles)
    return (
      <ModalBodyShare>
        <div className="modal-title">Send note to friends</div>
        <div className="modal-content">
          <div className="list-friends">xxxxx</div>
          <div className="selected-list-frients">xxxxx</div>
          <div className="selected-list-notes">
            {
              titles.map(data => (
                <ListNote key={data.id} onClick={ () => this.handleTitleChange(data.id, data.status) }>
                  <CheckBox/>
                  <div>{data.title}</div>
                </ListNote>
              ))
            }
          </div>
          {/* <InputText onChange={(e) => this.setState({ urlFriend: e.target.value })} placeholder="friend url"/> */}
        </div>
        <div className="modal-btn">
          <ButtonModal onClick={() => this.props.shareTitle(this.state.urlFriend)} column="2" color="#7CFC00">OK</ButtonModal>
          <ButtonModal onClick={() => this.props.closeModal('SHARE_MODAL') } column="4" color="#DC143C">Cancle</ButtonModal>
        </div>
      </ModalBodyShare>
    )
  }
}

export const Modal = (Content) => (props) => {
  return (
    <ReactModal
      isOpen={props.visible}
      onAfterOpen={ () => document.body.style.overflow = 'hidden' }
      onRequestClose={() => {
        document.body.style.overflow = 'auto'
        props.closeModal(props.type)
      }}
      contentLabel={props.type}
      style={styleModal(props.type)}
    >
    <Content {...props}/>
  </ReactModal>
  )
}

const InputText = styled.input.attrs({
  type: 'text',
  autoFocus: true
})`
  border-radius: 5px;
  width: 85%;
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
const ListNote = styled.div`
  text-align: center;
  font-size: 18px;
  border-bottom: 1px solid #FFFFFF;
  height: 45px;
  background: #202020;
  cursor: pointer;
`

const ModalBodyShare = styled.div`
  display: grid;
  grid-template-rows: 20% 60% 20%;
  height: 100%;
  .modal-title {
    text-align: center;
    grid-row: 1;
    padding: 7px 0px 0px 0px;
    color: rgb(187, 26, 26);
    font-weight: bold;
    border-bottom: solid 1px #FFFFFF;
  }
  .modal-content {
    grid-row: 2;
    display: grid;
    grid-template-columns: 30% 30% 40%;
    .list-friends {
      grid-column: 1;
      border-right: 1px solid #FFFFFF;
    }
    .selected-list-friends {
      grid-column: 2;
    }
    .selected-list-notes {
      color: #FFFFFF;
      height: 180px;
      overflow-y: scroll;
      border-left: 1px solid #FFFFFF;
      grid-column: 3;
    }
  }
  .modal-btn {
    grid-row: 3;
    display: grid;
    /* padding-top: 14.5px; */
    border-top: 1px solid #FFFFFF;
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
  width: 100%;
`

