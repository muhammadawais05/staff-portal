
import {
  CRITICAL_APP_QUERIES_BATCH_KEY,
  gql,
  useQuery
,BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetChromeDocument } from './get-chrome.staff.gql.types'

export const GET_CHROME = gql`
  query GetChrome {
    viewer {
      permits {
        handleRoleMetrics
        useQuicksearch
        viewMyOperationalIssues
      }
      availableTools {
        salesTool
        salesToolEscalations
      }
      chameleonParticipantUuid
    }
  }
`

export const useGetChromeData = () =>
  useQuery(GetChromeDocument, {
    context: { [BATCH_KEY]: CRITICAL_APP_QUERIES_BATCH_KEY }
  })
