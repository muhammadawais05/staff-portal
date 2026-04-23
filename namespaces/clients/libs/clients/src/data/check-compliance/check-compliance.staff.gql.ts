import { gql, useMutation } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CheckClientComplianceDocument,
  CheckClientComplianceMutation
} from './check-compliance.staff.gql.types'
import { CHECK_CLIENT_COMPLIANCE_FRAGMENT } from '../check-compliance-fragment/check-compliance-fragment.staff.gql'

export default gql`
  mutation CheckClientCompliance($input: CheckClientComplianceInput!) {
    checkClientCompliance(input: $input) {
      ...MutationResultFragment
      client {
        ...CheckComplianceFragment
        operations {
          checkClientCompliance {
            ...OperationFragment
          }
        }
      }
    }
  }

  ${CHECK_CLIENT_COMPLIANCE_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useCheckClientCompliance = ({
  onError,
  onCompleted
}: {
  onCompleted?: (data: CheckClientComplianceMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(CheckClientComplianceDocument, {
    onError,
    onCompleted
  })
