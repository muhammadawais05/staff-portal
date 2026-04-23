import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetCompanyRegions {
    regions {
      nodes {
        id
        name
      }
    }
  }
`
