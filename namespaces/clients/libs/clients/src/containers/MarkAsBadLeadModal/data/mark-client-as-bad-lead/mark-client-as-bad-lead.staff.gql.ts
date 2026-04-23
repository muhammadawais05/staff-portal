import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { MarkClientAsBadLeadDocument } from './mark-client-as-bad-lead.staff.gql.types'

export const MARK_CLIENT_AS_BAD_LEAD: typeof MarkClientAsBadLeadDocument = gql`
  mutation MarkClientAsBadLead($input: MarkClientAsBadLeadInput!) {
    markClientAsBadLead(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
