import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RemoveEventTagDocument } from './remove-event-tag.staff.gql.types'
import GetEventTags from '../get-event-tags/get-event-tags.staff.gql'

export default gql`
  mutation RemoveEventTag($input: RemoveCommunityEventTagInput!) {
    removeCommunityEventTag(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveEventTag = ({ onError }: { onError: () => void }) =>
  useMutation(RemoveEventTagDocument, {
    onError,
    refetchQueries: [
      {
        query: GetEventTags
      }
    ]
  })
