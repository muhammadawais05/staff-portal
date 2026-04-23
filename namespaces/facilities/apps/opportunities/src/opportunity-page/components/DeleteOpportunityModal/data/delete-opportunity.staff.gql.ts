import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  DeleteOpportunityDocument,
  DeleteOpportunityMutation
} from './delete-opportunity.staff.gql.types'

export const DELETE_OPPORTUNITY = gql`
  mutation DeleteOpportunity($input: DeleteOpportunityInput!) {
    deleteOpportunity(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useDeleteOpportunity = ({
  onError,
  onCompleted
}: {
  onCompleted?: (data: DeleteOpportunityMutation) => void
  onError: (error: Error) => void
}) => useMutation(DeleteOpportunityDocument, { onError, onCompleted })
