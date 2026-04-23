import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const COMPANY_ENTERPRISE_ACCOUNT_STATUS_FRAGMENT = gql`
  fragment CompanyEnterpriseAccountStatusFragment on Client {
    id
    enterpriseAccountStatus {
      status
    }
    operations {
      restoreClientEnterpriseAccountStatus {
        ...OperationFragment
      }
      updateClientEnterpriseAccountStatus {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
