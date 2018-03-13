import React from 'react'
import styled from 'styled-components'

const Topic = (props) => {
  return (
    <div className="all-title">
      {props.titles.map((note, index) => (
        <Tab 
          key={note.id} 
          onClick={ () => props.onContentChange(index, note.id)}
          selected = {props.indexTitle === index}
          animation='fade'
        >
          {note.title}
        </Tab>
      ))
      }
    </div>
  )
}

const Tab = styled.div`
  height: 35px;
  padding-top:15px;
  border-bottom: 2px solid #FFFFFF; 
  cursor: pointer;
  background: ${props => props.selected ? 'rgb(44,44,44)' : 'rgb(22,22,22)'}
`

export default Topic