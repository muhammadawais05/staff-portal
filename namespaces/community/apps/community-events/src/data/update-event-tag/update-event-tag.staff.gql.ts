import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { EVENT_TAG_FRAGMENT } from '../fragments/event-tag-fragment.staff.gql'
import { UpdateEventTagDocument } from './update-event-tag.staff.gql.types'

export default gql`
  mutation UpdateEventTag($input: UpdateCommunityEventTagInput!) {
    updateCommunityEventTag(input: $input) {
      ...MutationResultFragment
      eventTag {
        ...EventTagFragment
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${EVENT_TAG_FRAGMENT}
`

export const useUpdateEventTag = ({ onError }: { onError: () => void }) =>
  useMutation(UpdateEventTagDocument, {
    onError
  })
