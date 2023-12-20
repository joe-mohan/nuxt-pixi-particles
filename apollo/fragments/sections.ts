import { gql } from 'graphql-tag'
import { ImageFragment } from '../fragments/parts.js'

export const Hero = gql`
  fragment Hero on ComponentSectionsHero {
    heading
    body
    background {
      ...ImageFragment
    }
  }
  ${ImageFragment}
`

export const TextBlock = gql`
  fragment TextBlock on ComponentSectionsTextBlock {
    body
  }
`
