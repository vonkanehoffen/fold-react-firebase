import { css } from 'styled-components'

// See https://www.styled-components.com/docs/advanced#media-templates
// Standard Bootstrap beakpoints:
// https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints

const sizes = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `

  return acc
}, {})

export default media