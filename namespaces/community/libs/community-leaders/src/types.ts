import { GetCommunityLeaderApplicationsQuery } from './data/get-community-leader-applications/get-community-leader-applications.staff.gql.types'
import { GetFeaturedCommunityLeadersQuery } from './data/get-featured-community-leaders/get-featured-community-leaders.staff.gql.types'
import { CommunityLeadersQuery } from './data/get-community-leaders/get-community-leaders.staff.gql.types'
import { GetCommunityLeaderQuery } from './data/get-community-leader/get-community-leader.staff.gql.types'
import { CommunityEventsFragment } from './data/fragments/community-leader-events.staff.gql.types'

export type CommunityLeaderData = GetCommunityLeaderQuery['communityLeader']

// Contains basic data for non-leaders: fullName, id, operations
export type CommunityLeaderBasicInfo = GetCommunityLeaderQuery['node']

export type CommunityLeaderApplication = Present<
  Present<CommunityLeaderData>['application']
>

export type CommunityLeaders = CommunityLeadersQuery['communityLeaders']

export type CommunityLeader = ArrayItem<Present<CommunityLeaders>['nodes']>

export type FeaturedCommunityLeaders =
  GetFeaturedCommunityLeadersQuery['communityFeaturedLeaders']

export type FeaturedCommunityLeader = ArrayItem<
  Present<FeaturedCommunityLeaders>
>

export type CommunityLeaderApplications =
  GetCommunityLeaderApplicationsQuery['communityLeaderApplications']

export type CommunityLeaderApplicationNode = ArrayItem<
  Present<CommunityLeaderApplications>['nodes']
>

export type CommunityLeaderApplicationData = Present<
  CommunityLeaderApplicationNode['application']
>

export type CommunityEvents = CommunityEventsFragment['communityEvents']

export type CommunityEventData = ArrayItem<Present<CommunityEvents>['nodes']>
