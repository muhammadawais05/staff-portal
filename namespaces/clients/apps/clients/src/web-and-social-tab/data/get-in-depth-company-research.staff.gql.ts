import { gql } from '@staff-portal/data-layer-service'

import { GET_IN_DEPTH_COMPANY_RESEARCH_CLIENT } from './get-in-depth-company-research-client-fragment.staff.gql'

export default gql`
  query GetInDepthCompanyResearch($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        ...GetInDepthCompanyResearchClient
      }
    }
  }

  ${GET_IN_DEPTH_COMPANY_RESEARCH_CLIENT}
`
