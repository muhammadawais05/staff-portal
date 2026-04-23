import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const OPPORTUNITY_FRAGMENT = gql`
  fragment OpportunityFragment on Opportunity {
    id
    type
    jobs {
      nodes {
        id
      }
    }
    tasks {
      nodes {
        id
        status
      }
    }
    weightedValue
    updatedAt
    name
    salesforceId
    status
    casesUrl
    webResource {
      text
      url
    }
    operations {
      ...OpportunityOperationsFragment
    }
  }

  fragment OpportunityOperationsFragment on OpportunityOperations {
    deleteOpportunity {
      ...OperationFragment
    }
  }

  ${OPERATION_FRAGMENT}
`
