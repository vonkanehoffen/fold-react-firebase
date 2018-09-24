import React from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import colors from '../colors'
import Background from '../components/Background'

const SaveSuccessChromeExt = (props) => {
  return (
    <div>
      <Background color={colors.primary}/>
      <h2>Link saved.</h2>
      <a href="https://fold.im/">View on Fold.im</a>
      <Button onClick={() => window.close()}>Close</Button>
    </div>
  )
}

export default SaveSuccessChromeExt