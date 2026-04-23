import { gql, useMutation } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateCompanyRepresentativeProfileDocument,
  UpdateCompanyRepresentativeProfileMutation
} from './update-representative-profile.staff.gql.types'
import { REPRESENTATIVE_FRAGMENT } from '../representative-fragment/representative-fragment.staff.gql'

export default gql`
  mutation UpdateCompanyRepresentativeProfile(
    $input: UpdateCompanyRepresentativeProfileInput!
  ) {
    updateCompanyRepresentativeProfile(input: $input) {
      companyRepresentative {
        id
        ...Representative
      }
      ...MutationResultFragment
    }
  }
  ${REPRESENTATIVE_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateCompanyRepresentativeProfile = ({
  onError,
  onCompleted
}: {
  onError?: () => void
  onCompleted?: (data: UpdateCompanyRepresentativeProfileMutation) => void
}) =>
  useMutation(UpdateCompanyRepresentativeProfileDocument, {
    onError,
    onCompleted
  })
