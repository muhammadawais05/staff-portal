import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ChangeTalentSourcerDocument,
  ChangeTalentSourcerMutation
} from './change-talent-sourcer.staff.gql.types'

export const CHANGE_TALENT_SOURCER: typeof ChangeTalentSourcerDocument = gql`
  mutation ChangeTalentSourcer($input: ChangeTalentSourcerInput!) {
    changeTalentSourcer(input: $input) {
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

export const useChangeTalentSourcer = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted: (data: ChangeTalentSourcerMutation) => void
}) =>
  useMutation(CHANGE_TALENT_SOURCER, {
    onError,
    onCompleted
  })
