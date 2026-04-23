import { TaskCardLayout } from '@staff-portal/tasks'
import React, { SyntheticEvent, useCallback } from 'react'
import {
  ModalKey,
  TaskCardConfig,
  StaffPortalTimelineButton
} from '@staff-portal/billing/src/@types/types'
import { useModals as billingUseModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import PaymentTaskCardContent from '../PaymentTaskCardContent'
import { useGetPaymentTaskCard } from '../../data'
import { paymentDetailsUpdateDataEvents } from '../../../../utils'
import { getTaskCardInitialValues } from '../../../../../commercialDocument/utils/getTaskCardInitialValues'

interface Props {
  taskCardConfig: TaskCardConfig
  task: {
    id: string
    description: string
    status: string
    playbookTemplate?: {
      identifier: string
    } | null
  }
  TimelineButton: StaffPortalTimelineButton
}

const PaymentTaskCard = ({
  taskCardConfig: {
    title: taskCardTitle,
    subtitle: taskCardSubtitle,
    entityId: paymentId
  },
  task,
  TimelineButton
}: Props) => {
  const { data: payment, loading, refetch } = useGetPaymentTaskCard(paymentId)
  const { handleOnOpenModal } = billingUseModals()
  const handleOnClick = useCallback(
    ({ currentTarget: { dataset } }: SyntheticEvent<HTMLElement>) => {
      const { value: modalName } = dataset

      switch (modalName) {
        case ModalKey.memorandumAdd:
          return handleOnOpenModal(modalName, {
            initialValues: getTaskCardInitialValues(task),
            nodeId: payment.documentNumber.toString(),
            nodeType: 'payment'
          })
        default:
          console.warn('Unhandled: PaymentTaskCard Action')
      }
    },
    [handleOnOpenModal, payment, task]
  )

  useRefetch(paymentDetailsUpdateDataEvents, refetch)

  return (
    <TaskCardLayout loading={loading}>
      {payment && (
        <PaymentTaskCardContent
          payment={payment}
          taskCardTitle={taskCardTitle}
          taskCardSubtitle={taskCardSubtitle as string}
          taskPlaybookIdentifier={task.playbookTemplate?.identifier}
          taskStatus={task.status}
          handleOnClick={handleOnClick}
          TimelineButton={TimelineButton}
        />
      )}
    </TaskCardLayout>
  )
}

PaymentTaskCard.displayName = 'PaymentTaskCard'

export default PaymentTaskCard
