import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ProcessGdprRemovalTalentDocument,
  ProcessGdprRemovalTalentMutation
} from './remove-gdpr-data.staff.gql.types'

export default gql`
  mutation ProcessGdprRemovalTalent($talentId: ID!) {
    processGdprRemovalTalent(input: { talentId: $talentId }) {
      talent {
        id
        operations {
          processGdprRemovalTalent {
            callable
            messages
          }
        }
      }

      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useProcessGdprRemovalTalent = ({
  talentId,
  onCompleted,
  onError
}: {
  talentId: string
  onCompleted?: (data: ProcessGdprRemovalTalentMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(ProcessGdprRemovalTalentDocument, {
    variables: { talentId },
    onCompleted,
    onError
  })
