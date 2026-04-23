import { gql, useQuery } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { GigParticipationType } from '@staff-portal/graphql/staff'

import getWorkspaceParticipant from '../../utils/get-workspace-participant'
import { SLACK_WORKSPACE_FRAGMENT } from '../slack-workspace-fragment'
import {
  GetGigCandidatesQuery,
  GetGigCandidatesQueryVariables,
  GigReachoutsFragment
} from './get-gig-candidates.staff.gql.types'

export const GET_GIG_CANDIDATES = gql`
  query GetGigCandidates($id: ID!) {
    node(id: $id) {
      ...GigReachoutsFragment
    }
  }

  fragment GigReachoutsFragment on PublicationGig {
    ... on PublicationGig {
      id
      reachOuts: workspaces(filter: { type: { oneOf: PublicationReachOut } }) {
        totalCount
        nodes {
          ...ReachOutFragment
        }
      }

      slackConversations: workspaces(
        filter: { type: { oneOf: SlackWorkspace } }
      ) {
        totalCount
        nodes {
          ...SlackWorkspaceFragment
        }
      }
    }
  }

  fragment ReachOutFragment on GigReachOut {
    id
    participations {
      totalCount
      nodes {
        id
        participationType
        role {
          ...ReachOutTalentFragment
        }
      }
    }
    status
    rejectionReasonIdentifier
    rejectionReasonComment
  }

  fragment ReachOutTalentFragment on Talent {
    id
    fullName
    timeZone {
      ...TimeZoneFragment
    }
    slackContacts: contacts(filter: { type: COMMUNITY_SLACK }) {
      nodes {
        id
        webResource {
          url
        }
      }
    }
    webResource {
      url
      text
    }
    photo {
      thumb
    }
    talentPartner {
      id
      webResource {
        text
        url
      }
    }
  }

  ${TIME_ZONE_FRAGMENT}
  ${SLACK_WORKSPACE_FRAGMENT}
`

export const useGetGigCandidates = (
  variables: GetGigCandidatesQueryVariables,
  options?: {
    skip?: boolean
    onCompleted: (data: GetGigCandidatesQuery) => void
  }
) => {
  const { data, error, loading, ...restOptions } = useQuery<{
    node: GigReachoutsFragment
  }>(GET_GIG_CANDIDATES, {
    variables,
    notifyOnNetworkStatusChange: true,
    ...options
  })

  const reachOuts = data?.node?.reachOuts.nodes || []
  const slackConversations = data?.node?.slackConversations.nodes || []

  return {
    candidates: reachOuts.map(reachOut => {
      const talent = getWorkspaceParticipant(
        reachOut,
        GigParticipationType.CANDIDATE
      )

      return {
        reachOut,
        slackConversation: slackConversations.find(
          slackConversation =>
            getWorkspaceParticipant(slackConversation)?.id === talent?.id
        )
      }
    }),
    reachOuts,
    slackConversations,
    error,
    loading,
    ...restOptions
  }
}
