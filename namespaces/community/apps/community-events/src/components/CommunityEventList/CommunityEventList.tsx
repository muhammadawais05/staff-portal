import React from 'react'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'

import CommunityEventListItem from '../../components/CommunityEventListItem/CommunityEventListItem'
import { CommunityEvents, CommunityEvent } from '../../types'

const NO_RESULTS_MESSAGE =
  'There are no community events for this search criteria'

interface Props {
  communityEvents: CommunityEvents
}

const CommunityEventList = ({ communityEvents }: Props) => {
  return (
    <ItemsList<CommunityEvent>
      data={communityEvents}
      itemWithoutSection
      renderItem={communityEvent => (
        <CommunityEventListItem communityEvent={communityEvent} />
      )}
      getItemKey={communityLeader => communityLeader?.id}
      notFoundMessage={<NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />}
    />
  )
}

export default CommunityEventList
