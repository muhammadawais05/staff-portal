import { Container, Indicator, Paper, Typography } from '@toptal/picasso'
import React from 'react'
import {
  DEFAULT_FULL_DATE_FORMAT,
  formatDate,
  useGetServerTimeZone
} from '@staff-portal/date-time-utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

import { LineChartGranularity } from '../../types'
import { formatValue, calculateDisplayDate } from './utils'
import * as S from './styles'

export type Payload = {
  name: string
  value: number
  color: string
  payload: Record<string, number>
}

export interface Props {
  active?: boolean
  label?: number
  payload?: Payload[]
  granularity?: LineChartGranularity
  values: Record<string, number | null>
  labels: Record<string, string>
  units: Record<string, string>
}

const ChartTooltip = ({
  active,
  label,
  payload,
  values,
  labels,
  granularity,
  units
}: Props) => {
  const formatUserDateTime = useUserDateTimeFormatter()
  const { data: serverTimeZone } = useGetServerTimeZone()

  if (!active || !serverTimeZone) {
    return null
  }

  const rawDate = Object.keys(values)[label || 0]
  const { serverDate, utcDate } = calculateDisplayDate(
    rawDate,
    serverTimeZone.value,
    granularity
  )

  const lines = Object.keys(labels)
    .map(lineName => payload?.find(({ name }) => name === lineName))
    .filter((item): item is Payload => item !== undefined)

  return (
    <Paper>
      <Container css={S.chartTooltip} padded='small'>
        <Typography size='xsmall' weight='semibold'>
          {formatDate(serverDate, {
            dateFormat: DEFAULT_FULL_DATE_FORMAT
          })}
        </Typography>

        {lines.map(line => (
          <Container flex alignItems='center' key={line.name}>
            <Container right='xsmall'>
              <Indicator color='blue' style={{ background: line.color }} />
            </Container>
            <Typography size='xsmall' noWrap>
              {labels[line.name]}: {formatValue(line, units[line.name])}
            </Typography>
          </Container>
        ))}

        <Typography size='xsmall' noWrap>
          Time is displayed in{' '}
          <Typography as='span' weight='semibold'>
            {serverTimeZone.name}
          </Typography>
        </Typography>
        <Typography size='xsmall'>
          <Typography as='span' weight='semibold'>
            {formatUserDateTime(
              utcDate.toISOString(),
              DEFAULT_FULL_DATE_FORMAT
            )}
          </Typography>{' '}
          in your time zone
        </Typography>
      </Container>
    </Paper>
  )
}

export default ChartTooltip
