import React from 'react'
import styled from 'styled-components'
import CenterVH from './CenterVH'
import CircularProgress from '@material-ui/core/CircularProgress'
import colors from '../colors'
import Background from '../components/Background'

const FullScreenLoader = (props) => {
  return (
    <CenterVH>
      <Background color="black"/>
      <CircularProgress color={colors.primary}/>
    </CenterVH>
  )
}

export default FullScreenLoader