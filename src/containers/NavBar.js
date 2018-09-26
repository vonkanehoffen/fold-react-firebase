import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Link } from 'react-router-dom'
import colors from '../colors'
import Logo from '../images/foldLogo@2x.png'
import IconButton from '../components/IconButton'

class NavBar extends Component {

  state = {
    menuOpen: false,
  }

  signOut = () => {
    firebase.auth().signOut()
  }
  deleteAccount = () =>
    firebase.auth().currentUser.delete()

  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render() {
    return (
      <Spacer>
        <NavBarOuter>
          <HomeLink to="/">
            <img src={Logo} alt="Fold" height={60}/>
          </HomeLink>
          <Inner>
            {this.props.children}
          </Inner>
          <MenuOuter>
            <IconButton icon="more_vert" onClick={this.toggleMenu}/>
            {this.state.menuOpen &&
            <Menu>
              <p>Hello, {firebase.auth().currentUser.displayName}</p>
              <Link to="/about">About</Link>
              <Button variant="outlined" onClick={this.signOut}>Sign Out</Button>
              <Button variant="flat" onClick={this.deleteAccount}>Delete account</Button>
            </Menu>
            }
          </MenuOuter>
        </NavBarOuter>
      </Spacer>
    )
  }

}

const Spacer = styled.div`
  height: 60px;
`
const NavBarOuter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  background: ${colors.primary};
`

const HomeLink = styled(Link)`
  display: flex;
  img {
    margin: 0;
  }
`

const Inner = styled.div`
  flex: 1;
`

const MenuOuter = styled.div`
  position: relative;
`

const Menu = styled.div`
  position: absolute;
  background: ${colors.primary};
  right: 0;
  width: 300px;
`


export default NavBar 
