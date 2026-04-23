import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Amount, Table } from '@toptal/picasso'
import { formatDateLongMonthYear } from '@staff-portal/billing/src/_lib/dateTime'
import { getISODateFromYearMonth } from '@staff-portal/billing/src/utils/date'

import { CommissionWidgetMonthsFragment } from '../../data/getDashboardCommissionWidget.graphql.types'

const displayName = 'CommissionWidgetContentTable'

interface Props {
  months: CommissionWidgetMonthsFragment[]
}

export const CommissionWidgetContentTable = ({ months }: Props) => {
  const { t: translate } = useTranslation('commission')

  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={2}>
            <Typography
              size='inherit'
              weight='semibold'
              data-testid={`${displayName}-title`}
            >
              {translate('dashboard.data')}
            </Typography>
          </Table.Cell>
        </Table.Row>
        {months.map(({ year, month, amount }, index) => (
          <Table.Row
            data-testid={`${displayName}-${month}-${year}`}
            key={`${year}-${month}`}
            stripeEven={Boolean((index + 1) % 2)}
          >
            <Table.Cell>
              <Typography size='inherit' data-testid={`${displayName}-date`}>
                {formatDateLongMonthYear(
                  getISODateFromYearMonth({ year, month })
                )}
              </Typography>
            </Table.Cell>
            <Table.Cell>
              <Amount
                align='right'
                amount={amount}
                as='p'
                data-testid={`${displayName}-amount`}
                inline={false}
                size='inherit'
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

CommissionWidgetContentTable.displayName = displayName

export default memo(CommissionWidgetContentTable)
