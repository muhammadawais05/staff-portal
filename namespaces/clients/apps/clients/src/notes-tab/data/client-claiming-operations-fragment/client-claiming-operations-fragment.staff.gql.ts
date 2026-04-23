import { gql } from '@staff-portal/data-layer-service'
import { COMPANY_OPERATION_FRAGMENT } from '@staff-portal/clients'

export const CLIENT_CLAIMING_OPERATIONS_FRAGMENT = gql`
  fragment ClientClaimingOperationsFragment on ClientOperations {
    approveClient {
      ...CompanyOperationFragment
    }
    markClientAsBadLead {
      ...CompanyOperationFragment
    }
    pauseClient {
      ...CompanyOperationFragment
    }
    repauseClient {
      ...CompanyOperationFragment
    }
    resumeClient {
      ...CompanyOperationFragment
    }
    checkClientCompliance {
      ...CompanyOperationFragment
    }
    createClientClaimer {
      ...CompanyOperationFragment
    }
    sendClientClaimEmail {
      ...CompanyOperationFragment
    }
  }

  ${COMPANY_OPERATION_FRAGMENT}
`
