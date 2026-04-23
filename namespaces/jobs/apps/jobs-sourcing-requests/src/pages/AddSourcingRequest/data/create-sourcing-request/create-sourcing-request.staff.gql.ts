import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CreateSourcingRequestDocument } from './create-sourcing-request.staff.gql.types'

export const CREATE_SOURCING_REQUEST = gql`
  mutation CreateSourcingRequest($input: CreateSourcingRequestInput!) {
    createSourcingRequest(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateSourcingRequest = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(CreateSourcingRequestDocument, { onError })
