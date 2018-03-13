import React from 'react'
import styled from 'styled-components'

const Topic = (props) => {
  return (
    <AllTopic>
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

const Tab = styled.div`
  height: 35px;
  padding-top:15px;
  border-bottom: 2px solid #FFFFFF; 
  cursor: pointer;
  background: ${props => props.selected ? 'rgb(44,44,44)' : 'rgb(22,22,22)'}
`

export default Topic