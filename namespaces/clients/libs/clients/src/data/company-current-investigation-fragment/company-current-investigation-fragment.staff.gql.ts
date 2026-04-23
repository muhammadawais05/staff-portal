import { gql } from '@staff-portal/data-layer-service'

export const COMPANY_CURRENT_INVESTIGATION_FRAGMENT = gql`
  fragment CompanyCurrentInvestigation on Client {
    investigations(filter: { current: true }) {
      nodes {
        id
        startedAt
      }
    }
  }
`
