import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateTalentProfileDocument } from './update-talent-profile.staff.gql.types'

export default gql`
  mutation UpdateTalentProfile($input: UpdateTalentProfileInput!) {
    updateTalentProfile(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateTalentProfile = ({
  onError
}: {
  onError?: (error: Error) => void
}) =>
  useMutation(UpdateTalentProfileDocument, {
    onError
  })
