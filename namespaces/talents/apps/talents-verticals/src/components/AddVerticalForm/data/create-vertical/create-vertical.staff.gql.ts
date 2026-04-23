import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateVerticalMutation,
  CreateVerticalDocument
} from './create-vertical.staff.gql.types'

export const CREATE_VERTICAL_MUTATION = gql`
  mutation CreateVertical($input: CreateVerticalInput!) {
    createVertical(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateVerticalMutation = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateVerticalMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(CreateVerticalDocument, {
    onCompleted,
    onError
  })
