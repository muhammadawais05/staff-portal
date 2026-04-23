import gql from 'graphql-tag'
import { useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateCompanyRepresentativeDocument,
  CreateCompanyRepresentativeMutation
} from './create-company-representative.staff.gql.types'
import { REPRESENTATIVE_FRAGMENT } from '../../../../data'

export default gql`
  mutation CreateCompanyRepresentative(
    $input: CreateCompanyRepresentativeInput!
  ) {
    createCompanyRepresentative(input: $input) {
      companyRepresentative {
        id
        ...Representative
      }
      ...MutationResultFragment
    }
  }
  ${REPRESENTATIVE_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateCompanyRepresentative = ({
  onError,
  onCompleted
}: {
  onError?: () => void
  onCompleted?: (data: CreateCompanyRepresentativeMutation) => void
}) =>
  useMutation(CreateCompanyRepresentativeDocument, {
    onError,
    onCompleted
  })
