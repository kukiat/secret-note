import React from 'react'

export default class Note extends React.Component {
  componentDidUpdate() {
    console.log('child')
  }
  render() {
    return (
      <div>wwwwww</div>
    )
  }
}