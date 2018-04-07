import React from 'react'
import styled from 'styled-components'

import { Modal, RemoveBody, ShareBody, Btn }  from '../components/Modal'
import Topic from '../components/Topic'
import Note from '../components/Note'
import firebase from '../config'
import Header from './Header'
import CustomModal from '../components/CustomModal'

const db = firebase.database()

const RemoveModal = Modal(RemoveBody)
const ShareModal = Modal(ShareBody)

class DashBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      titles: [],
      tabId: null,
      indexTitle: 0,
      type: '',
      visible: {
        remove: false,
        share: false
      },
      dbEdit: -1
    }
  }

  async componentDidMount() {
    const ref = await db.ref('note').once('value')
    const notes = ref.val()
    const newNotes = []
    //have user
    Object.keys(notes).forEach((key) => {
      if(this.props.userId === notes[key].userId) {
        newNotes.push(Object.assign(notes[key], { id: key }))
      }
    })
    //new user
    if(newNotes.length === 0) {
      const noteNewUser = {userId: this.props.userId, content: 'Note something here!!', title:'New Title'}
      const val = db.ref('note').push(noteNewUser)
      Object.assign(noteNewUser, { id: val.key })
      newNotes.push(noteNewUser)
    }
    this.setState({ 
      titles: newNotes.reverse(),
      value: newNotes[0].content,
      tabId: newNotes[0].id,
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    const { titles, type, tabId, value, indexTitle} = this.state
    if(type === 'UPDATE' && !this.isBlank(value)) {
      await db.ref('note').child(tabId).update({ content: value })
      Object.assign(titles[indexTitle], {content: value})
      this.setState({ titles: titles, type: '' })
    }
    if(type === 'REMOVE_BLANK') {
      await db.ref('note').child(prevState.tabId).remove()
      titles.splice(prevState.indexTitle, 1)
      if(prevState.indexTitle < indexTitle) {
        this.setState({ type: '', titles: titles, indexTitle: indexTitle -1 })
      }else{
        this.setState({ type: '', titles: titles, indexTitle: indexTitle })
      }
    }
  }

  async componentWillUnmount() {
    if(this.isBlank(this.state.value)) {
      await db.ref('note').child(this.state.tabId).remove()
    }
  }

  isBlank = (text) => {
    return !text || text.length === 0 || /^\s*$/.test(text)
  }

  onChangeConTent = (index, id) => {
    const { titles, value, indexTitle } = this.state
    const titleContent = titles[index].content
    if(this.isBlank(value) && indexTitle !== index) {
      this.setState({
        indexTitle: index,
        value : titleContent,
        type: 'REMOVE_BLANK'
      })
    }
    else if(indexTitle !== index) {
      this.setState({ 
        value : titleContent,
        tabId: id,
        indexTitle: index,
        type: 'CHOOSE'
      })
    }
  }

  addTitle = async () => {
    const newNote = {title: 'New Title', userId: this.props.userId, content: 'New note' }
    const ref = await db.ref('note').push(newNote)
    this.state.titles.unshift(Object.assign(newNote, { id: ref.key }))
    this.setState({
      titles: this.state.titles,
      value: newNote.content,
      indexTitle: 0,
      tabId: ref.key,
      type: 'ADD'
    })
  }

  removeTitle = async () => {
    const { titles } = this.state
    if(this.state.titles.length > 1) {
      await db.ref('note').child(this.state.tabId).remove()
      titles.splice(this.state.indexTitle, 1)
      this.setState({ 
        type: 'REMOVE', 
        titles: titles,
        tabId: this.state.titles[0].id,
        value: this.state.titles[0].content ,
        indexTitle: 0, 
        visible: { ...this.state.visible, remove: false}
      })
    }
    // else {
    //   console.log('topic must have 1')
    // }
  }

  chooseModal = (typeModal, status) => {
    const { visible } = this.state
    switch (typeModal) {
      case 'REMOVE_MODAL':
        this.setState({type: 'MODAL', visible: {...visible, remove: status}})
        break;
      case 'SHARE_MODAL':
        this.setState({type: 'MODAL', visible: {...visible, share: status}})
        break;
      default:
        break;
    }
  }

  onChangeTitle = (e, noteId) => {
    db.ref('note').child(noteId).update({ title: e.target.value })
    const index = this.state.titles.findIndex((n) => n.id === noteId)
    Object.assign(this.state.titles[index], {title: e.target.value})
    this.setState({ titles: this.state.titles, type: 'UPDATE_TITLE'})
  }

  onValueChange = (values) => {
    this.setState({ value: values, type: 'UPDATE' })
  }

  openModal = (typeModal) => {
    this.chooseModal(typeModal, true)
  }

  closeModal = (typeModal) => {
    this.chooseModal(typeModal, false)
  }

  onOpenInput = (e, index) => {
    this.setState({ dbEdit: index, type: 'EDIT_TITLE' })
  }

  onClickOther = (e) => {
    if(this.state.dbEdit !== -1 && e.target.id !=='unless') {
      this.setState({ dbEdit: -1, type: '' })
    }
  }

  shareTitle = (value) => {
    console.log(value)
  }

  render() {
    const { logout } = this.props
    const { titles, indexTitle, value, visible } = this.state
    return (
      <div className="main-dashboard" onClick ={ (e) => this.onClickOther(e) }>
        <Header FbResponse ={ this.props.FbResponse }/>
        <ContainerNote>
          <div className="btn-main">
            <Button color="rgb(107, 207, 82)" onClick={ () => this.addTitle() }>ADD</Button>
            <Button color="#F33A3A" onClick={ () => this.openModal('REMOVE_MODAL') }>REMOVE</Button>
            <Button color="#3399FF" onClick={ () => this.openModal('SHARE_MODAL') }>SHARE</Button>
            <Button color="#F8CC52" onClick={ () => logout()} >SignOut</Button>
            <CustomModal/>
          </div>
          <Topic 
            titles={ titles } 
            onChangeConTent={ this.onChangeConTent }
            onChangeTitle={ this.onChangeTitle }
            onOpenInput = { this.onOpenInput }
            indexTitle={ indexTitle }
            dbEdit={ this.state.dbEdit }
          />
          <Note
            onValueChange={this.onValueChange}
            value ={ value }
          />
        </ContainerNote>
        { visible.remove && 
          <RemoveModal 
            visible={ visible.remove } 
            removeTitle={ this.removeTitle } 
            closeModal={ this.closeModal }
          />
        }
        { visible.share && 
          <ShareModal 
            visible={ visible.share }
            closeModal={ this.closeModal }
            shareTitle={ this.shareTitle }
          />
        }
      </div>
    )
  }
}

const ContainerNote = styled.div`
  font-weight: 400px;
  margin-top: 25px;
  height: 550px;
  display: grid;
  grid-template-columns: repeat(20,5%);
  .btn-main {
    grid-column: 2/3; 
    display: grid;
    grid-template-rows: repeat(20,5%);
    grid-gap: 20px;
  }
`

const Button = styled.a`
  ${props => Btn(props)}
`

export default DashBoard