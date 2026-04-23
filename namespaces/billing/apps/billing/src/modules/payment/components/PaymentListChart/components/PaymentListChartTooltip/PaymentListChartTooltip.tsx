import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Paper, Container, Typography, Indicator } from '@toptal/picasso'
import { DateTime } from 'luxon'
import {
  formatDateMedWithTime,
  parse
} from '@staff-portal/billing/src/_lib/dateTime'
import { useUserContext } from '@staff-portal/billing/src/_lib/context/userContext'

import { Payload as FullPayload } from '../../utils/convertValuesToData'
import { colorVariantByKey } from '../../utils'
import { Key, Value } from '../../data/usePaymentsChart'

type DotPayload = Record<Key, Value> & { x: string; order: number }

interface Props {
  data: FullPayload[]
  baseTimezone?: string
  active?: boolean
  payload?: { payload: DotPayload }[]
}

export const PaymentListChartTooltip = ({
  data,
  baseTimezone,
  active,
  payload
}: Props) => {
  const { currentUser } = useUserContext()
  const { t: translate } = useTranslation('payment')
  const {
    order,
    paid_early: paidEarly,
    not_received: notReceived
  } = payload?.[0]?.payload || {}
  const date = typeof order === 'number' ? data[order].date : ''
  const strDate = date?.toString() || ''

  const dateObj = DateTime.fromISO(date || '', { zone: baseTimezone })
  const parsedDate = parse(dateObj).plus({ day: 1 }).minus({ minute: 1 })
  const timezoneShiftedDate = strDate
    ? parse(parsedDate).setZone(currentUser?.timeZone?.value || '')
    : ''

  return !active ? null : (
    <Paper>
      <Container padded='xsmall'>
        <Typography weight='semibold' size='medium' data-testid='chart-title'>
          {formatDateMedWithTime(parsedDate)}
        </Typography>
        <Container data-testid='chart-not-received'>
          <Container inline right='small'>
            <Indicator color={colorVariantByKey('not_received')} />
          </Container>
          <Typography
            inline
            size='medium'
            data-testid='chart-not-received-value'
          >
            {translate('chart.tooltip.notReceived', { value: notReceived })}
          </Typography>
        </Container>

        <Container data-testid='chart-paid-early'>
          <Container inline right='small'>
            <Indicator color={colorVariantByKey('paid_early')} />
          </Container>
          <Typography inline size='medium' data-testid='chart-paid-early-value'>
            {translate('chart.tooltip.paidEarly', { value: paidEarly })}
          </Typography>
        </Container>

        <Container top={1}>
          <Typography inline size='xsmall' data-testid='chart-timezone'>
            <Trans>
              {translate('chart.tooltip.timeZone', {
                timeZone: '(UTC-05:00) America - New York', // dateObj.zoneName,
                date: formatDateMedWithTime(timezoneShiftedDate)
              })}
            </Trans>
          </Typography>
        </Container>
      </Container>
    </Paper>
  )
}

PaymentListChartTooltip.displayName = 'PaymentListChartTooltip'

export default PaymentListChartTooltip
