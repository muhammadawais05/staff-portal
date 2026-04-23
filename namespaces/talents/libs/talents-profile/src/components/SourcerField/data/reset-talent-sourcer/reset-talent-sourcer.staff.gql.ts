import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ResetTalentSourcerDocument,
  ResetTalentSourcerMutation
} from './reset-talent-sourcer.staff.gql.types'

export const RESET_TALENT_SOURCER: typeof ResetTalentSourcerDocument = gql`
  mutation resetTalentSourcer($input: ResetTalentSourcerInput!) {
    resetTalentSourcer(input: $input) {
      talent {
        id
        sourcer {
          id
          ... on WebResource {
            webResource {
              text
              url
            }
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResetTalentSourcer = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted: (data: ResetTalentSourcerMutation) => void
}) =>
  useMutation(RESET_TALENT_SOURCER, {
    onError,
    onCompleted
  })
