import React, { useEffect, FunctionComponent } from 'react'
import {
  Button,
  Container,
  Typography,
  Loader,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink,
  Update16
} from '@toptal/picasso'
import { useFormState } from '@toptal/picasso-forms'
import { CategoriesChart } from '@topkit/analytics-charts'

import { BarChartFilters } from '../../types'
import * as S from './styles'
import { useGetBarChartData } from '../../data'

export interface BarChartProps {
  title: string
  chartPath: string
  onChange: (values: BarChartFilters) => void
  TopRightContent?: FunctionComponent
  BottomContent?: FunctionComponent
}

const ChartSectionBody = ({
  title,
  chartPath,
  onChange,
  TopRightContent,
  BottomContent
}: BarChartProps) => {
  const { values } = useFormState<BarChartFilters>()
  const { chartData, loading, error, refetch } = useGetBarChartData({
    chartPath
  })

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
        <Container>
          <Typography inline size='small' variant='heading'>
            {title}
          </Typography>
        </Container>
        {TopRightContent && (
          <Container flex>
            <TopRightContent />
          </Container>
        )}
      </Container>
      <Container
        flex
        direction='column'
        alignItems='center'
        justifyContent='center'
        css={S.chartWrapper}
      >
        {chartData?.data && (
          <CategoriesChart
            // Charts should allow flexible width
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            width='100%'
            height={S.CHART_HEIGHT}
            labels={chartData.labels}
            data={chartData.data}
            tooltips={chartData.tooltips}
          />
        )}
        {loading && (
          <Container
            flex
            css={S.loadingWrapper}
            alignItems='center'
            justifyContent='center'
          >
            <Loader size='small' />
          </Container>
        )}
        {chartData?.auth_path && !loading && (
          <>
            <Typography size='medium'>
              Please{' '}
              <PicassoLink href={chartData?.auth_path} target='_blank'>
                login to Analytics
              </PicassoLink>{' '}
              and then refresh the chart
            </Typography>
            <Container top='small'>
              <Button
                onClick={() => {
                  refetch()
                }}
                icon={<Update16 />}
              >
                Refresh
              </Button>
            </Container>
          </>
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

export default ChartSectionBody
