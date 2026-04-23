import { gql } from '@staff-portal/data-layer-service'

export const CLIENT_MISSION_FRAGMENT = gql`
  fragment ClientMissionFragment on Client {
    id
    mission
  }
`
