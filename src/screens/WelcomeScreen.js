import React, { Component } from 'react'
import styled from 'styled-components'
import Background from '../components/Background'
import NavBar from '../containers/NavBar'
import TagSelect from '../containers/TagSelect'
import NewFAB from '../components/NewFAB'
import MyFolds from '../containers/MyFolds'
import CenterVH from '../components/CenterVH'
import colors from '../colors'

class WelcomeScreen extends Component {

  // state = {
  //   filterTags: [],
  // }
  //
  // setFilter = (filterTags) => this.setState({ filterTags })

  // TODO: Sort welcome screen. An expansion on the no folds message?
  render() {
    return (
      <CenterVH>
        <Background color="black"/>
        {/*<NavBar>*/}
          {/*/!*<TagSelect selectedTags={this.state.filterTags} setTags={this.setFilter}/>*!/*/}
        {/*</NavBar>*/}
        <NewFAB/>
        <Message>
          <h3>No folds yet!</h3>
        </Message>
      </CenterVH>
    )
  }

}

const Message = styled.div`
  color: ${colors.primary};
  background:#f00;
`

export default WelcomeScreen 
