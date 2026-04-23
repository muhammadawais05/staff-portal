import { gql, useQuery } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'

import { EVENT_TAG_FRAGMENT } from '../fragments/event-tag-fragment.staff.gql'
import { GetEventTagsDocument } from './get-event-tags.staff.gql.types'

export default gql`
  query GetEventTags {
    talentCommunityEventTags {
      ...EventTagFragment
    }
  }
  ${EVENT_TAG_FRAGMENT}
`

export const useGetEventTags = () => {
  const { showError } = useNotifications()
  const { data, loading, error } = useQuery(GetEventTagsDocument, {
    notifyOnNetworkStatusChange: true,
    onError() {
      showError('Could not fetch event tags')
    }
  })

  return {
    data: data?.talentCommunityEventTags,
    loading,
    error
  }
}
