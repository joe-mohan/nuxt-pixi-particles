import { gql } from 'graphql-tag'
import { LinkFragment } from './parts.js'

export const FooterFragment = gql`
  fragment FooterFragment on ComponentStructureFooter {
    menu {
      ...LinkFragment
    }
    copyright
  }
  ${LinkFragment}
`
