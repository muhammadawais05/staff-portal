import React, { useEffect, FunctionComponent } from 'react'
import { Container, Typography, Tooltip, Loader } from '@toptal/picasso'
import { useFormState } from '@toptal/picasso-forms'
import { palette } from '@toptal/picasso/utils'
import { QuestionMark16 } from '@toptal/picasso/Icon'
import { AnalyticsChart } from '@topkit/analytics-charts'

import { LineChartFilters } from '../../types'
import * as S from './styles'
import ChartTooltip from '../ChartTooltip'
import { useGetLineChartsData } from '../../data'

export interface LineChartProps {
  title: string
  chartPath: string
  onChange: (values: LineChartFilters) => void
  TopRightContent?: FunctionComponent
  BottomContent?: FunctionComponent
}

const LineChartSectionBody = ({
  title,
  chartPath,
  onChange,
  TopRightContent,
  BottomContent
}: LineChartProps) => {
  const { values } = useFormState<LineChartFilters>()
  const { chartData, loading, error } = useGetLineChartsData({ chartPath })

  useEffect(() => {
    onChange(values)
  }, [values, onChange])

  if (error) {
    return null
  }

  return (
    <Container>
      <Container
        flex
        alignItems='center'
        justifyContent='space-between'
        bottom='medium'
      >
        <Container inline as='span' flex alignItems='center'>
          <Typography inline size='small' variant='heading' css={S.chartTitle}>
            {title}
          </Typography>
          <Tooltip interactive content={chartData?.description}>
            <Container inline as='span' left='xsmall'>
              <QuestionMark16 />
            </Container>
          </Tooltip>
        </Container>
        {TopRightContent && (
          <Container flex>
            <TopRightContent />
          </Container>
        )}
      </Container>
      <Container
        flex
        justifyContent='center'
        alignItems='center'
        css={S.chartWrapper}
      >
        {chartData && !loading ? (
          <Container css={S.chartInner}>
            <AnalyticsChart
              tooltip
              height={S.CHART_HEIGHT}
              customTooltip={
                <ChartTooltip
                  values={chartData.data[0].values}
                  granularity={chartData.granularity}
                  labels={chartData.labels}
                  units={chartData.units}
                />
              }
              formatXAxisLabel={chartData.formatLabel}
              referenceLines={chartData.referenceLines}
              highlights={[
                { data: chartData.highlights, color: palette.red.main }
              ]}
              unit={chartData.unit}
              data={chartData.data}
              granularity={chartData.granularity}
              lineConfig={chartData.lineConfig}
            />
          </Container>
        ) : (
          <Loader size='small' />
        )}
      </Container>
      {BottomContent && (
        <Container top='xsmall'>
          <BottomContent />
        </Container>
      )}
    </Container>
  )
}

export default LineChartSectionBody
