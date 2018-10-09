import React, { Component } from 'react'
import MyFolds from '../containers/MyFolds'
import TagSelect from '../containers/TagSelect'
import NavBar from '../containers/NavBar'
import NewFAB from '../components/NewFAB'
import styled from 'styled-components'
import colors from '../colors'
import Background from '../components/Background'
import MyTags from '../containers/MyTags'

class HomeScreen extends Component {

  state = {
    filterTags: [],
  }

  setFilter = (filterTags) => this.setState({ filterTags })

  render() {

    return (
      <Outer>
        <Background color="black"/>
        <NavBar>
          <TagSelect selectedTags={this.state.filterTags} setTags={this.setFilter}/>
        </NavBar>
        <MyTags selectedTags={this.state.filterTags} setTags={this.setFilter}/>
        <NewFAB/>
        <MyFolds filterTags={this.state.filterTags} setFilter={this.setFilter}/>
      </Outer>
    )
  }

}

const Outer = styled.div`
  padding-bottom: 2rem;
`

export default HomeScreen 
