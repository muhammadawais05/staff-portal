import { ScheduledPayment24 } from '@toptal/picasso/Icon'
import { TaskCardLayout } from '@staff-portal/tasks'
import { useTranslation } from 'react-i18next'
import React, { SyntheticEvent } from 'react'
import { StaffPortalTimelineButton } from '@staff-portal/billing/src/@types/types'

import { getPaymentDetailsContent } from '../../utils'
import PaymentTaskCardActions from '../PaymentTaskCardActions'
import PaymentTaskCardSummary from '../PaymentTaskCardSummary'
import { GetPaymentTaskCardQuery } from '../../data/getPaymentTaskCard.graphql.types'

interface Props {
  taskCardTitle: string
  taskCardSubtitle: string
  taskPlaybookIdentifier?: string
  taskStatus: string
  payment: Exclude<GetPaymentTaskCardQuery['node'], null | undefined>
  handleOnClick: (e: SyntheticEvent<HTMLElement>) => void
  TimelineButton: StaffPortalTimelineButton
}

const PaymentTaskCardContent = ({
  taskCardTitle,
  taskCardSubtitle,
  taskPlaybookIdentifier,
  taskStatus,
  payment,
  handleOnClick,
  TimelineButton
}: Props) => {
  const { t: translate } = useTranslation('payment')
  const { description, webResource } = payment

  return (
    <>
      <TaskCardLayout.Header>
        <TaskCardLayout.Title
          title={taskCardTitle}
          icon={<ScheduledPayment24 base={40} color='blue' />}
          link={webResource.url}
        >
          {taskCardSubtitle}
        </TaskCardLayout.Title>

        <PaymentTaskCardActions
          payment={payment}
          handleOnClick={handleOnClick}
          taskPlaybookIdentifier={taskPlaybookIdentifier}
          taskStatus={taskStatus}
          TimelineButton={TimelineButton}
        />
      </TaskCardLayout.Header>

      <PaymentTaskCardSummary payment={payment} />

      <TaskCardLayout.Content items={getPaymentDetailsContent(payment)} />

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

PaymentTaskCardContent.displayName = 'InvoiceTaskCard'

export default PaymentTaskCardContent
