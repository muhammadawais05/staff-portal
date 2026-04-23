import { GetEventTagsQuery } from './data/get-event-tags/get-event-tags.staff.gql.types'
import { GetCommunityEventsQuery } from './data/get-community-events/get-community-events.staff.gql.types'

export type EventTag = ArrayItem<
  Present<GetEventTagsQuery['talentCommunityEventTags']>
>

export type CommunityEvents = Present<
  GetCommunityEventsQuery['communityEvents']
>['nodes']

export type CommunityEvent = ArrayItem<CommunityEvents>
