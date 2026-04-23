import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ApproveClientDocument } from './approve-client.staff.gql.types'

export const APPROVE_CLIENT: typeof ApproveClientDocument = gql`
  mutation ApproveClient($input: ApproveClientInput!) {
    approveClient(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
