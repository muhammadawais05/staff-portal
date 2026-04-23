export type OverviewWidgetPermissionsProps = {
  showOverviewApp?: boolean
  showBillingStats?: boolean
  showClaims?: boolean
  showCommissions?: boolean
  showCompanyCharts?: boolean
  showReferrals?: boolean
}

export const getOverviewWidgetPermissionsResponse = ({
  showOverviewApp = false,
  showBillingStats = false,
  showClaims = false,
  showCommissions = false,
  showCompanyCharts = false,
  showReferrals = false
}: Partial<OverviewWidgetPermissionsProps> = {}) => ({
  data: {
    widgets: {
      showOverviewApp,
      billingStats: {
        available: showBillingStats,
        __typename: 'BillingStatsWidget'
      },
      claims: {
        available: showClaims,
        nodes: [
          {
            roleStepsTitle: 'Online Test Core',
            __typename: 'ClaimsWidgetItem'
          }
        ],
        __typename: 'ClaimsWidget'
      },
      commissions: {
        available: showCommissions,
        __typename: 'CommissionsWidget'
      },
      companyCharts: {
        available: showCompanyCharts,
        __typename: 'CompanyChartsWidget'
      },
      referrals: {
        available: showReferrals,
        __typename: 'ReferralsWidget'
      },
      __typename: 'Widgets'
    }
  }
})
