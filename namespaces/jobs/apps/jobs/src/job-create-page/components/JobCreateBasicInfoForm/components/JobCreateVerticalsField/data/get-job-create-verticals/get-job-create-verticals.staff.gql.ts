import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobCreateVerticals {
    verticals(order: { direction: ASC, field: ID }) {
      nodes {
        id
        name
        jobType {
          hint
        }
      }
    }
  }
`
