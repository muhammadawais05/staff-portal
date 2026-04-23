import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetClaimsWidgetDocument } from './get-claims-widget.staff.gql.types'
import { DASHBOARD_GQL_BATCH_KEY } from '../../../../constants'

export default gql`
  query GetClaimsWidget {
    widgets {
      claims {
        allClaimedTalentUrl
        nodes {
          talent {
            id
            webResource {
              url
              text
            }
          }
          roleStepsTitle
          roleStepsCount
          createdAt
        }
      }
    }
  }
`

export const useGetClaimsWidget = () => {
  const { data, ...rest } = useQuery(GetClaimsWidgetDocument, {
    context: { [BATCH_KEY]: DASHBOARD_GQL_BATCH_KEY }
  })

  return {
    data: data?.widgets.claims,
    ...rest
  }
}
