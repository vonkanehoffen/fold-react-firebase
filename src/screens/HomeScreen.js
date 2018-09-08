import React, { Component } from 'react'
import MyFolds from '../containers/MyFolds'
import TagSelect from '../containers/TagSelect'

class HomeScreen extends Component {

  state = {
    filterTags: [],
  }

  setFilter = (filterTags) => this.setState({ filterTags })

  render() {

    return (
      <div>
        <h1>Home Screen</h1>
        <TagSelect selectedTags={this.state.filterTags} setTags={this.setFilter}/>
        <MyFolds filterTags={this.state.filterTags} setFilter={this.setFilter}/>
      </div>
    )
  }

}


export default HomeScreen 
