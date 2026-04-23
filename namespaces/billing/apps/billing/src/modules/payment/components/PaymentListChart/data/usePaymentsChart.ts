import {
  KIPPER_CONTEXT,
  useQuery,
  QueryHookOptions
} from '@staff-portal/data-layer-service'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { Scalars } from '@staff-portal/graphql/staff'

import { GetPaymentsChartDoc } from './getPaymentsChart.graphql.rest'

export type Key = 'paid_early' | 'not_received'
export type Value = number
export type Values = { [date: string]: Value }
export type FormattedDate = Scalars['Date']

export interface Result {
  paymentsChart: {
    data: { id: Key; values: Values }[]
    labels: Record<Key, string>
    x_axis_type: string
    granularity: string
    units: Record<Key, string>
    timezone_label: string
    thresholds_dates: {
      [color: string]: Values
    }
    highlights: FormattedDate[]
    description: string
  }
}

export const usePaymentsChartQuery = ({
  variables: { url = '', path = '', kpi = '', ruleId = '' } = {}
}: QueryHookOptions<Result, Record<string, string | undefined>> = {}) =>
  useQuery<Result>(GetPaymentsChartDoc, {
    variables: { url, path, kpi, ruleId },
    fetchPolicy: 'cache-and-network',
    context: { type: KIPPER_CONTEXT }
  })

export const usePaymentsChart = ({
  kpi,
  ruleId = ''
}: {
  kpi: string
  ruleId?: string
}) => {
  const { endpoints: { Kipper } = {} } = useExternalIntegratorContext()

  if (!Kipper) {
    return {
      data: null,
      error: 'Missing Kipper URL.',
      loading: false,
      initialLoading: false
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, initialLoading, error } = useGetData(
    usePaymentsChartQuery,
    'paymentsChart'
  )({
    url: Kipper,
    path: 'api/v1/chart.json',
    kpi,
    ruleId
  })

  return {
    data,
    loading,
    initialLoading,
    error
  }
}
