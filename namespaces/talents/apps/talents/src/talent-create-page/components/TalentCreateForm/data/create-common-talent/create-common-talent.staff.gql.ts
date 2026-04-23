import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CreateCommonTalentDocument } from './create-common-talent.staff.gql.types'

export default gql`
  mutation CreateCommonTalent($input: CreateCommonTalentInput!) {
    createCommonTalent(input: $input) {
      talent {
        id
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateCommonTalent = ({
  onError
}: {
  onError?: (error: Error) => void
}) =>
  useMutation(CreateCommonTalentDocument, {
    onError
  })
