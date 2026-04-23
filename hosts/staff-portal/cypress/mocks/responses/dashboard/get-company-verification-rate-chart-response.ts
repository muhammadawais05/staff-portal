export const getCompanyVerificationRateChartResponse = () => ({
  data: {
    widgets: {
      companyCharts: {
        verificationRateChart: {
          chartTitle: '7-day Company Verification Rates',
          chartType: 'company_time_window_verification_rate',
          roleChartUrl:
            'https://kipper-staging.toptal.net/api/v1/chart.json?kpi=company_relative_time_window_verification_rate&role_id=1209624&rule_id=&team_id=',
          teamChartUrl:
            'https://kipper-staging.toptal.net/api/v1/chart.json?kpi=company_time_window_verification_rate&rule_id=&team_id=',
          tooltip:
            'This KPI’s chart displays the **percentage of high and medium priority leads applied between 1 and 2 weeks ago and verified within 7 days after application.**\r\n\r\nIn the KPI dashboard the data is related to the entire company, while in the operational issue detailed page there is team-specific data. \r\n\r\n**Threshold Lines**\r\n\r\n\r\n*———*{.chart_thresholds_legend-item_icon .is-red} 5%\r\n\r\n*———*{.chart_thresholds_legend-item_icon .is-orange} 7%\r\n\r\n*———*{.chart_thresholds_legend-item_icon .is-green} 10%\r\n',
          __typename: 'CompanyVerificationRateChart'
        },
        __typename: 'CompanyChartsWidget'
      },
      __typename: 'Widgets'
    }
  }
})
