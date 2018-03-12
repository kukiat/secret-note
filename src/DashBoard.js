import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2';
import firebase from './config'
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
      prepareId: null,
    }
  }

  async componentDidMount() {
    const ref = await db.ref('note').once('value')
    const notes = ref.val()
    const allNotes = Object.keys(notes).map((key) => Object.assign(notes[key], { id: key }))
    this.setState({ 
      titles: allNotes,
      value: allNotes[0].content,
      prepareId: allNotes[0].id,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.value !== '') {
      console.log('prepareId',this.state.prepareId)
      console.log('prevState',prevState.value)
      console.log('value', this.state.value)
    }
  }

  onContentChange = (index, id) => {
    const { value, titles } =this.state
    const titleContent = titles[index].content
    this.setState({ 
      value : titleContent,
      prepareId: id
    })
  }

  addTitle = ()=> {
    this.state.titles.push({id: Math.random().toString(), title: 'newTitle', content: `xxxx`, userId:'1150'})
    this.setState({ titles:this.state.titles })
  }

  save = async () => {
    const { userId} = this.props
    // const ref = await db.ref('note').push({
    //   userId, 
    //   content: this.state.value,
    //   title: 'title'
    // })
  }

  render() {
    const { addTitle } = this.props
    const { titles } = this.state
    const options = {
      theme: 'material text-note',
    }
    
    return (
      <div className="main-dashboard">
        <div className="head-title" >Note everything that secret</div>
        <div className="main-note">
          <div className="btn-main">
            <div className= "btn-click btn-add" onClick={ () => this.addTitle() }>ADD</div>
            <div className= "btn-click btn-save" onClick={ () => this.save() }>SAVE</div>
            <div className= "btn-click btn-signout" onClick={ () => this.props.logout() }>SignOut</div>
          </div>
          <div className="all-title">
            {
              titles.map((note, index) => (
                <div key={note.id} className="title-note" onClick={ ()=>this.onContentChange(index, note.id)} >{note.title}</div>
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

export default DashBoard