import React from 'react'
import styled from 'styled-components'

const Icon = ({className, children}) => {
  return (
    <i className={`material-icons ${className}`}>
      {children}
    </i>
  )
}

export default Icon