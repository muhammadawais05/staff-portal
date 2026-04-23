import {
  gql,
  useQuery,
  BATCH_KEY,
  GENERAL_APP_QUERIES_BATCH_KEY
} from '@staff-portal/data-layer-service'

import { GetTeamsWithEmailTrackingDocument } from './get-teams-with-email-tracking.staff.gql.types'

export const GET_TEAMS_WITH_EMAIL_TRACKING = gql`
  query GetTeamsWithEmailTracking {
    viewer {
      me {
        id
        teams(filter: { emailTracking: true }) {
          nodes {
            id
            emailTracking
          }
        }
      }
    }
  }
`

export const useGetTeamsWithEmailTracking = () => {
  const { data } = useQuery(GetTeamsWithEmailTrackingDocument, {
    context: { [BATCH_KEY]: GENERAL_APP_QUERIES_BATCH_KEY }
  })

  return {
    teams: data?.viewer.me.teams?.nodes
  }
}
