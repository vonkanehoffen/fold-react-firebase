import React from 'react'
import styled from 'styled-components'
import NavBar from '../containers/NavBar'

const AboutScreen = (props) => {
  console.log('rendering')
  return (
    <div>
      <NavBar>
        <h1>About</h1>
      </NavBar>
      <h2>Heading two</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aspernatur eaque eum eveniet exercitationem molestias mollitia, nesciunt nihil placeat praesentium! Atque, odio quas. Beatae expedita molestiae nihil placeat sint, totam!</p>
      <h3>Heading three</h3>
      <h4>Heading 4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, explicabo?</h4>
      <h5>H5 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, inventore maiores numquam officiis omnis praesentium sequi voluptatem? Consequatur, facere, voluptatum?</h5>
      <blockquote>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda eligendi incidunt, nostrum perspiciatis sunt veritatis. A alias dolor eveniet minima molestiae omnis quaerat qui sit sunt! Adipisci, animi, ex?</blockquote>
    </div>
  )
}

export default AboutScreen