import { JobStatus } from '@staff-portal/jobs'
import { TaskCardLayout } from '@staff-portal/tasks'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import { getInvoiceDuePeriodText } from '../../../../utils'
import CommercialDocumentStatus from '../../../../../commercialDocument/components/CommercialDocumentStatus'
import InvoiceAmountWithColorAndTooltip from '../../../InvoiceAmountWithColorAndTooltip'
import { GetInvoiceTaskCardQuery } from '../../data/getInvoiceTaskCard.graphql.types'

interface Props {
  invoice: Exclude<GetInvoiceTaskCardQuery['node'], null | undefined>
}

const displayName = 'InvoiceTaskCardSummary'

const InvoiceTaskCardSummary = ({ invoice }: Props) => {
  const { t: translate } = useTranslation('invoice')
  const { job, duePeriod, cleanOutstandingAmount } = invoice
  const balanceData = {
    ...invoice,
    amount: cleanOutstandingAmount
  }

  return (
    <TaskCardLayout.Summary>
      <TaskCardLayout.SummaryItem
        label={translate('taskCard.summary.status')}
        data-testid={`${displayName}-status`}
        value={
          <CommercialDocumentStatus
            document={invoice}
            withDate
            data-testid={`${displayName}-status-value`}
          />
        }
      />
      <TaskCardLayout.SummaryItem
        label={translate('taskCard.summary.balance')}
        data-testid={`${displayName}-balance`}
        value={
          <InvoiceAmountWithColorAndTooltip
            invoice={balanceData}
            iconPosition='right'
            weight='semibold'
          />
        }
      />
      <TaskCardLayout.SummaryItem
        label={translate('taskCard.summary.netTerms')}
        data-testid={`${displayName}-netTerms`}
        value={getInvoiceDuePeriodText(duePeriod)}
      />
      <TaskCardLayout.SummaryItem
        label={translate('taskCard.summary.jobStatus')}
        data-testid={`${displayName}-jobStatus`}
        value={
          job ? (
            <JobStatus
              job={job}
              data-testid={`${displayName}-jobStatus-component`}
            />
          ) : (
            EMPTY_DATA
          )
        }
      />
    </TaskCardLayout.Summary>
  )
}

InvoiceTaskCardSummary.displayName = displayName

export default InvoiceTaskCardSummary
