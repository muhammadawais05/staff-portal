import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetTalentCreatePositions {
    topscreenClients {
      nodes {
        id
        name
        topscreenPositions {
          nodes {
            id
            title
          }
        }
      }
    }
  }
`
