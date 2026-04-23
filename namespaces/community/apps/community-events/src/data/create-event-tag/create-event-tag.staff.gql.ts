import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { EVENT_TAG_FRAGMENT } from '../fragments/event-tag-fragment.staff.gql'
import { CreateEventTagDocument } from './create-event-tag.staff.gql.types'
import GetEventTags from '../get-event-tags/get-event-tags.staff.gql'
export default gql`
  mutation CreateEventTag($input: CreateCommunityEventTagInput!) {
    createCommunityEventTag(input: $input) {
      ...MutationResultFragment
      eventTag {
        ...EventTagFragment
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${EVENT_TAG_FRAGMENT}
`

export const useCreateEventTag = ({ onError }: { onError: () => void }) =>
  useMutation(CreateEventTagDocument, {
    onError,
    refetchQueries: [
      {
        query: GetEventTags
      }
    ]
  })
