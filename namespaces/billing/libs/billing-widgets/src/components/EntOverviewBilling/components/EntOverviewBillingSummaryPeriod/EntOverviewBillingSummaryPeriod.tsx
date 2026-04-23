import { Select } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { TimePeriod } from '@staff-portal/billing/src/_lib/dateTime/helper'
import { useOverviewContext } from '@staff-portal/billing/src/_lib/context/overviewContext'

const displayName = 'EntOverviewBillingSummaryPeriod'

export const EntOverviewBillingSummaryPeriod: FC = memo(() => {
  const { t: translate } = useTranslation('entOverview')

  const { sinceDate, setSinceDate } = useOverviewContext()

  const handleChange = (event: {
    target: {
      value: unknown
    }
  }) => {
    setSinceDate(event.target.value as TimePeriod)
  }

  return (
    <Select
      data-testid={displayName}
      options={[
        {
          text: translate('billing.summary.dateFilter.quarter'),
          value: 'quarter'
        },
        { text: translate('billing.summary.dateFilter.year'), value: 'year' },
        { text: translate('billing.summary.dateFilter.all'), value: 'all' }
      ]}
      onChange={handleChange}
      value={sinceDate}
      width='full'
    />
  )
})

EntOverviewBillingSummaryPeriod.defaultProps = {}

EntOverviewBillingSummaryPeriod.displayName = displayName

export default EntOverviewBillingSummaryPeriod
