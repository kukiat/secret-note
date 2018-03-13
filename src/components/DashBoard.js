import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2';
import firebase from '../config'
import styled from 'styled-components'
import Header from './Header'
const db = firebase.database()

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class DashBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      titles: [],
      tabId: null,
      indexTitle: 0
    }
  }

  async componentDidMount() {
    const ref = await db.ref('note').once('value')
    const notes = ref.val()
    const newNotes = []
    Object.keys(notes).map((key) => {
      if(this.props.userId === notes[key].userId) {
        newNotes.push(Object.assign(notes[key], { id: key }))
      }
    })
    //new user
    if(newNotes.length === 0) {
      const noteNewUser = {userId: this.props.userId, content: 'Note something here!!', title:'New Title'}
      const val = db.ref('note').push(noteNewUser)
      Object.assign(noteNewUser, {id: val.key})
      newNotes.push(noteNewUser)
    }
    this.setState({ 
      titles: newNotes.reverse(),
      value: newNotes[0].content,
      tabId: newNotes[0].id,
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    const { indexTitle, titles, value, tabId } = this.state
    const checkTab = titles[indexTitle].content === value
    if(prevState.value !== '' && value !== '' && !checkTab) {
      await db.ref('note').child(tabId).update({
        content: value
      })
      Object.assign(titles[indexTitle], {content: value})
      this.setState({ titles: titles })
    }
  }

  onContentChange = (index, id) => {
    const { titles } = this.state
    const titleContent = titles[index].content
    this.setState({ 
      value : titleContent,
      tabId: id,
      indexTitle: index
    })
  }

  addTitle = async () => {
    const newNote = {title: 'newTitle', userId: this.props.userId, content: ''}
    const ref = await db.ref('note').push(newNote)
    this.state.titles.unshift(Object.assign(newNote, { id: ref.key}))
    this.setState({
      titles: this.state.titles,
      value: ''
    })
  }
  
  render() {
    const { logout } = this.props
    const { titles, indexTitle } = this.state
    const options = { theme: 'material text-note' }
    return (
      <div className="main-dashboard">
        <Header FbResponse ={ this.props.FbResponse }/>
        <div className="main-note">
          <div className="btn-main">
            <Button color="rgb(107, 207, 82)" onClick={ () => this.addTitle() }>ADD</Button>
            <Button color="rgb(65, 83, 180)" onClick={ () => logout()} >SignOut</Button>
          </div>
          <div className="all-title">
            {titles.map((note, index) => (
              <Tab 
                key={note.id} 
                onClick={() => this.onContentChange(index, note.id)}
                selected = {indexTitle === index}
              >
                {note.title}
              </Tab>
            ))
            }
          </div>
          <div className="body-note">
            <div className="bg-text-note">
              <div className="wrap-text-note">
                <CodeMirror
                  value={this.state.value}
                  options={options}
                  onBeforeChange={(editor, data, value) => {
                    this.setState({
                      value
                    })
                  }}
                  onChange={(editor, value) => {}}
                />
              </div>
            </div>
          </div>
        </div>
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
`

const Tab = styled.div`
  height: 35px;
  padding-top:15px;
  border-bottom: 2px solid #FFFFFF; 
  cursor: pointer;
  background: ${props => props.selected ? 'rgb(44,44,44)' : 'rgb(22,22,22)'}
`

export default DashBoard