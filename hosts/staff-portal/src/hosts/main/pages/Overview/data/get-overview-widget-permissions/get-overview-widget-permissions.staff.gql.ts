import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetOverviewWidgetPermissionsDocument } from './get-overview-widget-permissions.staff.gql.types'

export const GET_OVERVIEW_WIDGET_PERMISSIONS: typeof GetOverviewWidgetPermissionsDocument = gql`
  query GetOverviewWidgetPermissions {
    widgets {
      showOverviewApp
      billingStats {
        available
      }
      claims {
        available
        nodes {
          roleStepsTitle
        }
      }
      commissions {
        available
      }
      companyCharts {
        available
      }
      referrals {
        available
      }
    }
  }
`

export const useGetOverviewWidgetPermissions = () =>
  useQuery(GET_OVERVIEW_WIDGET_PERMISSIONS)
