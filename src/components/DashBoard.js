import React from 'react'
import styled from 'styled-components'

import { Modal }  from './Modal'
import Topic from './Topic'
import Note from './Note'
import firebase from '../config'
import Header from './Header'

const db = firebase.database()

class DashBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      titles: [],
      tabId: null,
      indexTitle: 0,
      type: '',
      visible: false
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
    if(type === 'REMOVE') {
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

  onContentChange = (index, id) => {
    const { titles, value, indexTitle } = this.state
    const titleContent = titles[index].content
    if(this.isBlank(value) && indexTitle !== index) {
      this.setState({
        indexTitle: index,
        value : titleContent,
        type: 'REMOVE'
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
    const newNote = {title: 'newTitle', userId: this.props.userId, content: 'content = '+ Math.random().toString() }
    const ref = await db.ref('note').push(newNote)
    this.state.titles.unshift(Object.assign(newNote, { id: ref.key }))
    this.setState({
      titles: this.state.titles,
      value: newNote.content,
      indexTitle: 0,
      type: 'ADD'
    })
  }

  onValueChange = (values) => {
    this.setState({ value: values, type: 'UPDATE' })
  }

  openModal = () => {
    this.setState({type:'MODAL',visible: true})
  }

  closeModal = () => {
    this.setState({type:'MODAL',visible: false})
  }

  removeTitle = async () => {
    const { titles} = this.state
    if(this.state.titles.length > 1) {
      await db.ref('note').child(this.state.tabId).remove()
      titles.splice(this.state.indexTitle, 1)
      this.setState({ 
        type: '', 
        titles: titles, 
        indexTitle: 0, 
        value: this.state.titles[0].content ,
        visible: false
      })
    }else {
      console.log('topic must have 1')
    }
  }

  render() {
    const { logout } = this.props
    const { titles, indexTitle, value } = this.state
    return (
      <div className="main-dashboard">
        <Header FbResponse ={ this.props.FbResponse }/>
        <div className="main-note">
          <div className="btn-main">
            <Button color="rgb(107, 207, 82)" onClick={ () => this.addTitle() }>ADD</Button>
            <Button color="#F33A3A" onClick={ () => this.openModal() }>REMOVE</Button>
            <Button color="rgb(65, 83, 180)" onClick={ () => logout()} >SignOut</Button>
          </div>
          <Topic 
            titles={ titles } 
            onContentChange={this.onContentChange}
            indexTitle = {indexTitle}
          />
          <Note
            onValueChange={this.onValueChange}
            value ={ value }
          />
        </div>
        <Modal 
          visible={ this.state.visible } 
          closeModal={ this.closeModal }
          removeTitle={ this.removeTitle }
        />
      </div>
    )
  }
}

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

export default DashBoard