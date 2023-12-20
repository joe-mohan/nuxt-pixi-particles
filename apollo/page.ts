import { gql } from 'graphql-tag'
import { ImageFragment } from './fragments/parts.js'
import { TextBlock } from './fragments/sections.js'

export default gql`
query Page($slug: String!) {
   page(slug: $slug) {
      data {
        id
        attributes {
          title
          slug
          sections {
            ... on PageSectionsDynamicZone {
              __typename
              ...TextBlock
            }
          }
          meta_data {
            ... on ComponentStructureMetaData {
              title
              description
              author
              image {
                ...ImageFragment
              }
            }
          }
        }
      }
    }
  }
  ${ImageFragment}
  ${TextBlock}
`
