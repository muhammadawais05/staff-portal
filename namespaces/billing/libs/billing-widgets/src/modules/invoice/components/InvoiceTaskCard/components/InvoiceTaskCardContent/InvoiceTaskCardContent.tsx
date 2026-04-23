import { CreditCard32 } from '@toptal/picasso/Icon'
import { TaskCardLayout } from '@staff-portal/tasks'
import { useTranslation } from 'react-i18next'
import React, { SyntheticEvent } from 'react'
import { StaffPortalTimelineButton } from '@staff-portal/billing/src/@types/types'

import { GetInvoiceTaskCardQuery } from '../../data/getInvoiceTaskCard.graphql.types'
import { getInvoiceDetailsContent } from '../../utils'
import InvoiceTaskCardActions from '../InvoiceTaskCardActions'
import InvoiceTaskCardSummary from '../InvoiceTaskCardSummary'
import InvoiceTaskCardTitle from '../InvoiceTaskCardTitle'

interface Props {
  taskCardTitle: string
  taskCardSubtitle?: string
  taskPlaybookIdentifier?: string
  taskStatus: string
  invoice: Exclude<GetInvoiceTaskCardQuery['node'], null | undefined>
  handleOnClick: (e: SyntheticEvent<HTMLElement>) => void
  TimelineButton: StaffPortalTimelineButton
}

const InvoiceTaskCardContent = ({
  taskCardTitle,
  taskCardSubtitle,
  taskPlaybookIdentifier,
  taskStatus,
  invoice,
  handleOnClick,
  TimelineButton
}: Props) => {
  const { t: translate } = useTranslation('invoice')
  const {
    webResource: { url: invoiceUrl },
    description,
    consolidatedDocument
  } = invoice

  return (
    <>
      <TaskCardLayout.Header>
        <TaskCardLayout.Title
          title={taskCardTitle}
          icon={<CreditCard32 base={40} color='blue' />}
          link={invoiceUrl}
        >
          <InvoiceTaskCardTitle
            taskCardSubtitle={taskCardSubtitle}
            consolidatedDocument={consolidatedDocument}
          />
        </TaskCardLayout.Title>

        <InvoiceTaskCardActions
          invoice={invoice}
          handleOnClick={handleOnClick}
          taskPlaybookIdentifier={taskPlaybookIdentifier}
          taskStatus={taskStatus}
          TimelineButton={TimelineButton}
        />
      </TaskCardLayout.Header>

      <InvoiceTaskCardSummary invoice={invoice} />

      <TaskCardLayout.Content items={getInvoiceDetailsContent(invoice)} />

      {description && (
        <TaskCardLayout.Description
          title={translate('taskCard.description.title')}
        >
          <TaskCardLayout.DescriptionFormatter description={description} />
        </TaskCardLayout.Description>
      )}
    </>
  )
}

InvoiceTaskCardContent.displayName = 'InvoiceTaskCard'

export default InvoiceTaskCardContent
