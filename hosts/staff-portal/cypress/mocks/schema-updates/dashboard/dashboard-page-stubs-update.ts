import { dashboardPageStubs } from '~integration/mocks/request-stubs'
import {
  getBillingStatsWidgetResponse,
  getClaimsWidgetResponse,
  getCompanyVerificationRateChartResponse,
  getDashboardCommissionWidgetQueryResponse,
  getOverviewInvoicesResponse,
  getReferralsResponse
} from '~integration/mocks/responses/dashboard'

const updateDashboardPageStubs = () =>
  cy.stubGraphQLRequests({
    ...dashboardPageStubs({
      showOverviewApp: true,
      showBillingStats: true,
      showClaims: true,
      showCommissions: true,
      showCompanyCharts: true,
      showReferrals: true
    }),
    GetBillingStatsWidget: getBillingStatsWidgetResponse(),
    GetClaimsWidget: getClaimsWidgetResponse(),
    GetCompanyVerificationRateChart: getCompanyVerificationRateChartResponse(),
    GetDashboardCommissionWidgetQuery:
      getDashboardCommissionWidgetQueryResponse(),
    GetReferrals: getReferralsResponse(),
    OverviewInvoices: getOverviewInvoicesResponse(),
    GetKipperToken: {
      data: {
        viewer: {
          tokens: {
            charts:
              'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE4MTA3NDksInJvbGVfdG9rZW4iOiIxX1MxWTMzWDJSZV9oYVV3ODVVdCIsImlzcyI6InRvcHRhbC1wbGF0Zm9ybSJ9.7x0EcaUYxW7Q9sBWfOOdjvJgNN37RuVa3w6Hic74of4'
          }
        }
      }
    },
    GetBillingOverviewDetails: {
      data: {
        viewer: {
          me: {
            id: 'VjEtU3RhZmYtMTk4NTQ5Mw',
            manageesHaveSupervisedCompanies: false,
            __typename: 'Staff'
          },
          __typename: 'Viewer'
        }
      }
    }
  })

export default updateDashboardPageStubs
