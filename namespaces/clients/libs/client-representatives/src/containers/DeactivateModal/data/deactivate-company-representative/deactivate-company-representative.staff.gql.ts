import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { REPRESENTATIVE_FRAGMENT } from '../../../../data'
import {
  DeactivateCompanyRepresentativeDocument,
  DeactivateCompanyRepresentativeMutation
} from './deactivate-company-representative.staff.gql.types'

export default gql`
  mutation DeactivateCompanyRepresentative($companyRepresentativeId: ID!) {
    deactivateCompanyRepresentative(
      input: { companyRepresentativeId: $companyRepresentativeId }
    ) {
      companyRepresentative {
        ...Representative
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${REPRESENTATIVE_FRAGMENT}
`

export const useDeactivateCompanyRepresentative = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: DeactivateCompanyRepresentativeMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(DeactivateCompanyRepresentativeDocument, {
    onCompleted,
    onError
  })
