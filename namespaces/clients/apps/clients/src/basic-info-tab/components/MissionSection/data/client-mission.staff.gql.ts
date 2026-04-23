import { gql } from '@staff-portal/data-layer-service'

import { CLIENT_MISSION_FRAGMENT } from './client-mission-fragment.staff.gql'

export const GET_CLIENT_MISSION = gql`
  query GetClientMission($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        ...ClientMissionFragment
      }
    }

    ${CLIENT_MISSION_FRAGMENT}
  }
`

export const GET_CLIENT_MISSION_AND_OPERATION = gql`
  query GetClientMissionAndOperation($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        ...ClientMissionFragment
        operations {
          patchClientProfile {
            callable
            messages
          }
        }
      }
    }

    ${CLIENT_MISSION_FRAGMENT}
  }
`
