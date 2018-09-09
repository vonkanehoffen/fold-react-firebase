import React, { Component } from 'react'
import MyFolds from '../containers/MyFolds'
import TagSelect from '../containers/TagSelect'
import NavBar from '../containers/NavBar'
import NewFAB from '../components/NewFAB'

class HomeScreen extends Component {

  state = {
    filterTags: [],
  }

  setFilter = (filterTags) => this.setState({ filterTags })

  render() {

    return (
      <div>
        <NavBar>
          <TagSelect selectedTags={this.state.filterTags} setTags={this.setFilter}/>
        </NavBar>
        <NewFAB/>
        <MyFolds filterTags={this.state.filterTags} setFilter={this.setFilter}/>
      </div>
    )
  }

}


export default HomeScreen 
