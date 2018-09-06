import React from 'react'
import styled from 'styled-components'
import CenterVH from './CenterVH'
import CircularProgress from '@material-ui/core/CircularProgress'

const FullScreenLoader = (props) => {
  return (
    <CenterVH>
      <CircularProgress/>
    </CenterVH>
  )
}

export default FullScreenLoader