import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RATE_CHANGE_REQUEST_FRAGMENT } from '../../../../data'
import { CompleteRateChangeRequestDocument } from './'

export const COMPLETE_RATE_CHANGE_REQUEST = gql`
  mutation CompleteRateChangeRequest($input: CompleteRateChangeRequestInput!) {
    completeRateChangeRequest(input: $input) {
      ...MutationResultFragment
      rateChangeRequest {
        ...RateChangeRequestFragment
      }
    }
    ${MUTATION_RESULT_FRAGMENT}
    ${RATE_CHANGE_REQUEST_FRAGMENT}
  }
`

export const useCompleteRateChangeRequest = ({
  onError
}: {
  onError: (error: Error) => void
}) =>
  useMutation(CompleteRateChangeRequestDocument, {
    onError,
    refetchQueries: ['GetRelatedTasks']
  })
