import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { OPPORTUNITY_DETAILS_FRAGMENT } from '../../../../data/opportunity-details-fragment.staff.gql'
import {
  RemoveContractFromOpportunityDocument,
  RemoveContractFromOpportunityMutation
} from './remove-contract.staff.gql.types'

export const REMOVE_CONTRACT = gql`
  mutation RemoveContractFromOpportunity(
    $input: RemoveContractFromOpportunityInput!
  ) {
    removeContractFromOpportunity(input: $input) {
      opportunity {
        ...OpportunityDetailsFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${OPPORTUNITY_DETAILS_FRAGMENT}
`

export const useRemoveContractFromOpportunity = ({
  opportunityId,
  onCompleted,
  onError
}: {
  opportunityId: string
  onCompleted?: (data: RemoveContractFromOpportunityMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(RemoveContractFromOpportunityDocument, {
    variables: { input: { opportunityId } },
    onCompleted,
    onError
  })
