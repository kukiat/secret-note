import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2';
import firebase from '../config'
import styled from 'styled-components'
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
      check :false
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
    this.setState({ 
      titles: newNotes.reverse(),
      value: newNotes[0].content,
      tabId: newNotes[0].id,
    })
  }
  async componentDidUpdate(prevProps, prevState) {
    console.log(prevState.value)
    console.log( this.state.value)
    console.log( this.state.check)
    if(prevState.value !== '' && this.state.value !== '') {
      await db.ref('note').child(this.state.tabId).update({
        content: this.state.value
      })
      console.log('saved')
    }
    console.log('componentDidUpdate')
  }

  onContentChange = (index, id) => {
    const { titles } =this.state
    const titleContent = titles[index].content
    this.setState({ 
      value : titleContent,
      tabId: id
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
    const { logout, userId, tabId } = this.props
    const { titles } = this.state
    const options = {
      theme: 'material text-note',
    }
    return (
      <div className="main-dashboard">
        <div className="head-title" >{userId}</div>
        <div className="main-note">
          <div className="btn-main">
            <Button color="rgb(107, 207, 82)" onClick={ () => this.addTitle() }>ADD</Button>
            <Button color="rgb(65, 83, 180)" onClick={ () => logout()} >SignOut</Button>
          </div>
          <div className="all-title">
            {
              titles.map((note, index) => (
                <Tab 
                  key={note.id} 
                  onClick={() => this.onContentChange(index, note.id)} 
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
                      value,
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
`

export default DashBoard