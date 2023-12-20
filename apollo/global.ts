import { gql } from "graphql-tag";
import { ImageFragment, IconFragment } from "./fragments/parts.js";

import { FooterFragment } from "./fragments/structure.js";

export default gql`
  query Global {
    global {
      data {
        attributes {
          siteLogo {
            ...ImageFragment
          }
          footer {
            ...FooterFragment
          }
          socialMedia {
            ...IconFragment
          }
        }
      }
    }
  }
  ${ImageFragment}
  ${IconFragment}
  ${FooterFragment}
`;
