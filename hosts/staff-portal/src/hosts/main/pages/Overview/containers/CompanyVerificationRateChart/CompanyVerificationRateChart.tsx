import React, { useState, useMemo } from 'react'
import { Container } from '@toptal/picasso'
import { addQueryParams } from '@staff-portal/navigation'
import {
  LineChartSection,
  LevelSelect,
  RealKpiCheckbox,
  PeriodSelect,
  LineChartPeriod,
  LineChartLevel,
  LineChartFilters
} from '@staff-portal/charts'

import { useGetCompanyVerificationRateChart } from './data/get-company-verification-rate-chart/get-company-verification-rate-chart.staff.gql'

const PERIODS = [LineChartPeriod.LASTMONTH, LineChartPeriod.LASTWEEK]

const INITIAL_FILTERS = {
  realKpiValue: false,
  period: LineChartPeriod.LASTMONTH,
  level: LineChartLevel.ROLE
}

const TopRightContent = () => (
  <Container flex left='small'>
    <LevelSelect />
    <PeriodSelect periods={PERIODS} />
  </Container>
)

const CompanyVerificationRateChart = () => {
  const { data } = useGetCompanyVerificationRateChart()
  const [filters, setFilters] = useState<LineChartFilters>(INITIAL_FILTERS)

  const chart = data?.widgets.companyCharts?.verificationRateChart

  const chartPath = useMemo(() => {
    if (filters.realKpiValue === undefined) {
      throw new Error('Please specify real KPI checkbox')
    }

    if (filters.period === undefined) {
      throw new Error('Please specify period filter')
    }

    if (filters.level === undefined) {
      throw new Error('Please specify level filter')
    }

    if (!chart) {
      return ''
    }

    const basePath =
      filters.level === LineChartLevel.ROLE
        ? chart.roleChartUrl
        : chart.teamChartUrl

    return addQueryParams(basePath, {
      period: filters.period,
      real_kpi_value: filters.realKpiValue
    })
  }, [chart, filters])

  if (!chart?.roleChartUrl) {
    return null
  }

  return (
    <Container
      bordered
      rounded
      padded='medium'
      top='large'
      data-testid='company-verification-rate-chart'
    >
      <LineChartSection
        title={chart.chartTitle}
        initialFilters={INITIAL_FILTERS}
        chartPath={chartPath}
        onChange={setFilters}
        TopRightContent={TopRightContent}
        BottomContent={RealKpiCheckbox}
      />
    </Container>
  )
}

export default CompanyVerificationRateChart
