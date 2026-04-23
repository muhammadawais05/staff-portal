import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CreateTopscreenTalentDocument } from './create-topscreen-talent.staff.gql.types'

export default gql`
  mutation CreateTopscreenTalent($input: CreateTopscreenTalentInput!) {
    createTopscreenTalent(input: $input) {
      talent {
        id
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateTopscreenTalent = ({
  onError
}: {
  onError?: (error: Error) => void
}) =>
  useMutation(CreateTopscreenTalentDocument, {
    onError
  })
