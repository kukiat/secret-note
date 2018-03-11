import React from 'react'
// import CodeMirror from 'codemirror'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/material.css'
// import 'codemirror/theme/neat.css'
// import 'codemirror/mode/xml/xml.js'
// import 'codemirror/mode/javascript/javascript.js'

import {Controlled as CodeMirror} from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'kukiat wangtaphandwdasdwasdwawdwaadw\nNajadawdasdwadwwdawdadawddw'
    }
  }
  render() {
    const options = {
      theme: 'material',
    }
    console.log(this.state.value)
    return (
      <div>
        <div className="head-title" >Note everything that secret</div>
        <div className="main-note">
          <div className="all-title">
            <div className="title-note">Title</div>
            {/* <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div>
            <div className="title-note">Title</div> */}
          </div>
          <div className="body-note">
            <div className="bg-text-note">
              <div className="wrap-text-note">
                <CodeMirror
                  className="text-note"
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