import React from 'react';
import styled from 'styled-components'
import Button from '../components/Button'
import colors from '../colors'
import googleG from '../images/googleGWhite.svg'
import github from '../images/github.svg'

const SpacedButton = styled(Button)`
  margin: .5rem;
  .material-icons {
    vertical-align: middle;
    margin: 0 1rem 0 -.5rem;
  }
`

const Logo = styled.img`
  width: 24px;
  vertical-align: middle;
  margin: 0 1rem 0 -.5rem;  
`

export const GoogleButton = (props) =>
  <SpacedButton {...props} mainColor={colors.googleBlue} fgColor="white" filled>
    <Logo src={googleG} alt=""/>
    Sign in with Google
  </SpacedButton>

export const GithubButton = (props) =>
  <SpacedButton {...props} mainColor="#fff" filled>
    <Logo src={github} alt=""/>
    Sign in with Github
  </SpacedButton>

export const EmailButton = () =>
  <SpacedButton mainColor={colors.primary} filled>
    <i className="material-icons">mail</i>
    Sign in with Email
  </SpacedButton>