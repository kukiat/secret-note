import React from 'react'
import styled from 'styled-components'

function moveValueToEnd(e) {
  const temp_value = e.target.value
  e.target.value = ''
  e.target.value = temp_value
}

const Topic = (props) => {
  return (
    <AllTopic>
      {props.titles.map((note, index) => (
        <Tab 
          key={note.id} 
          onClick={ () => props.onChangeConTent(index, note.id)}
          selected = {props.indexTitle === index}
          animation='fade'
          onDoubleClick={ (e) => props.onOpenInput(e, index)}
        >
          { props.dbEdit ===  index ? 
            <InputText
              id="unless"
              defaultValue={note.title}
              autoFocus
              onFocus={ (e) => moveValueToEnd(e)}
              onChange={ (e) => props.onChangeTitle(e, note.id) }
            /> 
            : note.title.substring(0,12) 
          }
        </Tab>
      ))
      } 
    </AllTopic>
  )
}

const AllTopic = styled.div`
  text-align: center;
  overflow-x: scroll;
  grid-column: 3/5;
  border-radius: 10px 0px 0px 10px;
  border-left: 2px solid #FFFFFF;
  border-top: 2px solid #FFFFFF;
  border-bottom: 2px solid #FFFFFF;
  overflow-y: scroll;
`

const InputText = styled.input.attrs({
  type: 'text',
  // value : props => props.val
})`
  border-radius: 5px;
  width: 80%;
  font-size: 16px;
  height: 30px;
  background: rgb(23,44,56);
  color: #FFFFFF;
  border: 1px solid rgb(23,44,56);
`

const Tab = styled.div`
  height: 35px;
  padding-top:15px;
  border-bottom: 2px solid #FFFFFF; 
  cursor: pointer;
  background: ${props => props.selected ? 'rgb(44,44,44)' : 'rgb(22,22,22)'}
`

export default Topic