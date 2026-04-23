import { gql, useGetData } from '@staff-portal/data-layer-service'

import { GetBulkBetaStaffOperationDocument } from './get-bulk-beta-staff-operations.staff.gql.types'

export const GET_BULK_BETA_STAFF_OPERATIONS = gql`
  query GetBulkBetaStaffOperation {
    operations {
      bulkEnableBeta {
        callable
        messages
      }
      bulkDisableBeta {
        callable
        messages
      }
      addBetaEarlyAdopters {
        callable
        messages
      }
      removeBetaEarlyAdopters {
        callable
        messages
      }
    }
  }
`

export const useGetBulkBetaStaffOperations = () =>
  useGetData(GetBulkBetaStaffOperationDocument, 'operations')()
