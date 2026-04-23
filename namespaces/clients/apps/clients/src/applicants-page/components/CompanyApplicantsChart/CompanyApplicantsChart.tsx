import React, { useState, useMemo } from 'react'
import { addQueryParams } from '@staff-portal/navigation'
import {
  LineChartSection,
  RealKpiCheckbox,
  PeriodSelect,
  LineChartPeriod,
  LineChartFilters
} from '@staff-portal/charts'

interface Props {
  chartUrl: string
}

const INITIAL_FILTERS = {
  realKpiValue: false,
  period: LineChartPeriod.LASTDAY
}

const PERIODS = [
  LineChartPeriod.LASTMONTH,
  LineChartPeriod.LASTWEEK,
  LineChartPeriod.LASTDAY
]

const TopRightContent = () => <PeriodSelect periods={PERIODS} />

const CompanyApplicantsChart = ({ chartUrl }: Props) => {
  const [filters, setFilters] = useState<LineChartFilters>(INITIAL_FILTERS)

  const chartPath = useMemo(() => {
    if (filters.realKpiValue === undefined) {
      throw new Error('Please specify real KPI checkbox')
    }

    if (filters.period === undefined) {
      throw new Error('Please specify period filter')
    }

    return addQueryParams(chartUrl, {
      period: filters.period,
      real_kpi_value: filters.realKpiValue
    })
  }, [chartUrl, filters])

  return (
    <LineChartSection
      title='Average Claiming Time'
      initialFilters={INITIAL_FILTERS}
      chartPath={chartPath}
      onChange={setFilters}
      TopRightContent={TopRightContent}
      BottomContent={RealKpiCheckbox}
    />
  )
}

export default CompanyApplicantsChart
