import { gql } from 'graphql-tag'

export const LinkFragment = gql`
  fragment LinkFragment on ComponentPartsLink {
    label
    url
  }
`

export const ImageFragment = gql`
  fragment ImageFragment on UploadFileEntityResponse {
    data {
      attributes {
        formats
        ext
        url
        alternativeText
        width
        height
        mime
      }
    }
  }
`

export const MultipleImagesFragment = gql`
  fragment MultipleImagesFragment on UploadFileRelationResponseCollection {
    data {
      attributes {
        name
        formats
        ext
        url
        alternativeText
        provider
        width
        height
      }
    }
  }
`

export const VideoFragment = gql`
  fragment VideoFragment on ComponentPartsVideo {
    poster {
      ...ImageFragment
    }
    webm {
      ...ImageFragment
    }
    mp4 {
      ...ImageFragment
    }
    embedCode
    source
  }
  ${ImageFragment}
`

export const IconFragment = gql`
  fragment IconFragment on ComponentPartsIcon {
    label
    url
    image {
      ...ImageFragment
    }
  }
  ${ImageFragment}
`

