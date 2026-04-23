import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  DiscardTalentPrescreeningVideoDocument,
  DiscardTalentPrescreeningVideoMutation
} from './discard-talent-prescreening-video.staff.gql.types'

export const DISCARD_TALENT_PRESCREENING_VIDEO: typeof DiscardTalentPrescreeningVideoDocument = gql`
  mutation DiscardTalentPrescreeningVideo(
    $input: DiscardTalentPrescreeningVideoInput!
  ) {
    discardTalentPrescreeningVideo(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useDiscardTalentPrescreeningVideo = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted: (data: DiscardTalentPrescreeningVideoMutation) => void
}) =>
  useMutation(DISCARD_TALENT_PRESCREENING_VIDEO, {
    onError,
    onCompleted
  })
