import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateCallCounterpartyDocument } from './update-call-couterparty.staff.gql.types'

export const UPDATE_CALL_COUNTERPARTY = gql`
  mutation UpdateCallCounterparty($input: UpdateCallCounterpartyInput!) {
    updateCallCounterparty(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateCallCounterparty = () =>
  useMutation(UpdateCallCounterpartyDocument)
