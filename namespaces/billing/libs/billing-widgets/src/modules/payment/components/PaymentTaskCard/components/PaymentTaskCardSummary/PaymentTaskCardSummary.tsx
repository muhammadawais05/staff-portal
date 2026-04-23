import { Amount } from '@toptal/picasso'
import {
  TaskCardLayout,
  TaskCardLayoutSummaryItemVariant
} from '@staff-portal/tasks'
import { camelCase } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import { getDocumentStatusColor } from '@staff-portal/billing/src/_lib/helpers/billing'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'

import { GetPaymentTaskCardQuery } from '../../data/getPaymentTaskCard.graphql.types'

interface Props {
  payment: Exclude<GetPaymentTaskCardQuery['node'], null | undefined>
}

const displayName = 'PaymentTaskSummary'

const PaymentTaskSummary = ({ payment }: Props) => {
  const { t: translate } = useTranslation(['payment', 'common'])
  const { status, balanceDue, amount, dueDate } = payment
  const getDocumentStatus = status && `value-${getDocumentStatusColor(status)}`
  const summaryDueDate = dueDate && formatDateMed(dueDate)
  const transformedPaymentStatus = camelCase(status) as EnumKeysToCamelCase<
    typeof DocumentStatus
  >

  return (
    <TaskCardLayout.Summary>
      <TaskCardLayout.SummaryItem
        data-testid={`${displayName}-status`}
        label={translate('payment:taskCard.summary.status')}
        value={translate(
          `common:documents.statuses.${transformedPaymentStatus}` as const
        )}
        variant={getDocumentStatus as TaskCardLayoutSummaryItemVariant}
      />
      <TaskCardLayout.SummaryItem
        data-testid={`${displayName}-amount`}
        label={translate('payment:taskCard.summary.amount')}
        value={
          <Amount
            amount={amount}
            data-testid={`${displayName}-amount-component`}
          />
        }
      />
      <TaskCardLayout.SummaryItem
        data-testid={`${displayName}-balanceDue`}
        label={translate('payment:taskCard.summary.balanceDue')}
        value={
          <Amount
            amount={balanceDue}
            data-testid={`${displayName}-balanceDue-amount`}
          />
        }
      />
      <TaskCardLayout.SummaryItem
        data-testid={`${displayName}-dueDate`}
        label={translate('payment:taskCard.summary.dueDate')}
        value={summaryDueDate || EMPTY_DATA}
      />
    </TaskCardLayout.Summary>
  )
}

PaymentTaskSummary.displayName = displayName

export default PaymentTaskSummary
