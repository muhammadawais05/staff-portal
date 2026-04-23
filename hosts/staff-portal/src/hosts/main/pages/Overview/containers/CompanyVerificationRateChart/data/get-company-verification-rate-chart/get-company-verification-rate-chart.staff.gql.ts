import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetCompanyVerificationRateChartDocument } from './get-company-verification-rate-chart.staff.gql.types'

export default gql`
  query GetCompanyVerificationRateChart {
    widgets {
      companyCharts {
        verificationRateChart {
          chartTitle
          chartType
          roleChartUrl
          teamChartUrl
          tooltip
        }
      }
    }
  }
`

export const useGetCompanyVerificationRateChart = () =>
  useQuery(GetCompanyVerificationRateChartDocument)
