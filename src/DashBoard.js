import React from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class DashBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.titles[0].content
    }
  }

  onContentChange = (index) => {
    const { value } =this.state
    const titleContent = this.props.titles[index].content
    this.setState({
      value : titleContent
    })
  }

  render() {
    const { addTitle, titles } = this.props
    const options = {
      theme: 'material text-note',
    }
    console.log(this.state.value)
    return (
      <div className="main-dashboard">
        <div className="head-title" >Note everything that secret</div>
        <div className="main-note">
          <div className="btn-main">
            <div className= "btn-click" onClick={ () => addTitle() }>ADD</div>
            <div className= "btn-click" onClick={ () => addTitle() }>SAVE</div>
            <div className= "btn-click" onClick={ () => this.props.logout() }>SignOut</div>
          </div>
          <div className="all-title">
            {
              titles.map((title, index) => (
                <div key={index} className="title-note" onClick={ ()=>this.onContentChange(index)} >{title.name}</div>
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
                    this.setState({value});
                  }}
                  onChange={(editor, value) => {
                    console.log('controlled', {value});
                  }}
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