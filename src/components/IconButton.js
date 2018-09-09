import React from 'react'
import styled from 'styled-components'

const IconButton = ({icon, onClick}) => {
  return (
    <i
      className="material-icons"
      onClick={onClick}
      style={{
        padding: 5,
        cursor: 'pointer',
      }}
    >{icon}</i>
  )
}

export default IconButton