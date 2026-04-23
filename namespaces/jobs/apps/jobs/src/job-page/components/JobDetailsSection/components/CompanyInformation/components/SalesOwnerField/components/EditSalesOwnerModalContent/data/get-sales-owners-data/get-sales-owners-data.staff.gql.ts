import { gql } from '@staff-portal/data-layer-service'

export const GET_SALES_OWNERS_DATA = gql`
  query GetSalesOwnersData {
    rolesV2(filter: { scope: JOB_SALES_OWNERS }) {
      nodes {
        ... on Staff {
          id
          fullName
        }
      }
    }
  }
`
