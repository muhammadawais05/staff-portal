import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export const OPPORTUNITY_DETAILS_FRAGMENT = gql`
  fragment OpportunityDetailsFragment on Opportunity {
    id
    name
    age
    budget
    committedRevenue
    complete
    completeOutcome
    completeResult
    completeReason
    contractUrl
    createdAt
    description
    enterprise
    highPriority
    highPriorityReason
    open
    poAmount
    poNumber
    probability
    salesforceId
    salesforceUrl
    value
    weightedValue
    workType

    client {
      id
      ...WebResourceFragment
      root {
        id
        ...WebResourceFragment
      }
    }

    operations {
      ...OpportunityDetailsOperationsFragment
    }
  }

  fragment OpportunityDetailsOperationsFragment on OpportunityOperations {
    updateOpportunity {
      ...OperationFragment
    }
    updateContractFromOpportunity {
      ...OperationFragment
    }
    removeContractFromOpportunity {
      ...OperationFragment
    }
  }

  ${OPERATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
