import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'
import { useNotifications } from '@toptal/picasso/utils'

import { LogClientSalesCallDocument } from './log-client-sales-call.staff.gql.types'
import { CLIENT_CLAIMING_OPERATIONS_FRAGMENT } from '../../../../data/client-claiming-operations-fragment'

export const LOG_CLIENT_SALES_CALL: typeof LogClientSalesCallDocument = gql`
  mutation LogClientSalesCall($input: LogClientSalesCallInput!) {
    logClientSalesCall(input: $input) {
      ...MutationResultFragment

      client {
        id
        operations {
          ...ClientClaimingOperationsFragment
        }
        claimer {
          ...StaffUserFragment
        }
        claimerCategory
        accountOwner {
          ...StaffUserFragment
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${CLIENT_CLAIMING_OPERATIONS_FRAGMENT}
  ${STAFF_USER_FRAGMENT}
`

export const useLogClientSalesCall = () => {
  const { showError } = useNotifications()

  return useMutation(LOG_CLIENT_SALES_CALL, {
    onError: () => showError('Unable to log sales call.'),
    ignoreResults: true
  })
}
