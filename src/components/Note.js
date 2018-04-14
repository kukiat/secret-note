import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

const Note = (props) => {
  const options = { 
    theme: 'material text-note',
    viewportMargin: 50
  }
  return (
    <div className="body-note">
      <div className="bg-text-note">
        <div className="wrap-text-note">
          <CodeMirror
            value={props.value}
            options={options}
            onBeforeChange={(editor, data, value) => {
              props.onValueChange(value)
            }}
            onChange={(editor, value) => {}}
          />
        </div>
      </div>
    </div>
  )
}

export default Note