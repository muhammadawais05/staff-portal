import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { COMPANY_CURRENT_INVESTIGATION_FRAGMENT } from '@staff-portal/clients'

export const COMPANY_NEGOTIATION_FRAGMENT = gql`
  fragment CompanyNegotiationFragment on Client {
    ...CompanyCurrentInvestigation
    id
    badLead
    cumulativeStatus
    currentNegotiation {
      id
      status
      operations {
        suspendNegotiation {
          ...OperationFragment
        }
        updateNegotiationStatus {
          ...OperationFragment
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
  ${COMPANY_CURRENT_INVESTIGATION_FRAGMENT}
`
