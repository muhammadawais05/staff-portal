import { gql } from '@apollo/client'

export const GetPaymentsChartDoc = gql`
  query GetPaymentsChart(
    $url: string
    $path: string
    $kpi: string
    $ruleId: string
  ) {
    paymentsChart(url: $url, path: $path, kpi: $kpi, ruleId: $ruleId)
      @rest(
        type: "PaymentsChart"
        endpoint: "empty" # use "empty" endpoint to pass absolute urls via 'path' below
        method: "GET"
        path: "{args.url}/{args.path}?kpi={args.kpi}&rule_id={args.ruleId}"
      ) {
      data
      labels
      x_axis_type
      granularity
      units
      timezone_label
      thresholds_dates
      highlights
      description
    }
  }
`
