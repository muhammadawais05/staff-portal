import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

import { COMPANY_NEGOTIATION_FRAGMENT } from './company-negotiation-fragment.staff.gql'

export const LINKED_COMPANY_NODE_FRAGMENT = gql`
  fragment LinkedCompanyNodeFragment on Client {
    id
    fullName
    ...WebResourceFragment
    ...CompanyNegotiationFragment
    operations {
      ...LinkedCompanyOperationsFragment
    }
  }

  fragment LinkedCompanyOperationsFragment on ClientOperations {
    importSTA {
      ...OperationFragment
    }
    startNegotiationForClient {
      ...OperationFragment
    }
  }

  ${COMPANY_NEGOTIATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
