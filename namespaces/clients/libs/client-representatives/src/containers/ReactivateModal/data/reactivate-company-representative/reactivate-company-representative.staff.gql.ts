import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { REPRESENTATIVE_FRAGMENT } from '../../../../data'
import {
  ReactivateCompanyRepresentativeDocument,
  ReactivateCompanyRepresentativeMutation
} from './reactivate-company-representative.staff.gql.types'

export default gql`
  mutation ReactivateCompanyRepresentative($companyRepresentativeId: ID!) {
    reactivateCompanyRepresentative(
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

export const useReactivateCompanyRepresentative = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: ReactivateCompanyRepresentativeMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(ReactivateCompanyRepresentativeDocument, {
    onCompleted,
    onError
  })
