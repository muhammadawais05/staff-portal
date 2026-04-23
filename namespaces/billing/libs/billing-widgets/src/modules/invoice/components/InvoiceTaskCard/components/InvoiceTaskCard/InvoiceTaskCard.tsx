import { TaskCardLayout } from '@staff-portal/tasks'
import React, { SyntheticEvent, useCallback } from 'react'
import {
  ModalKey,
  TaskCardConfig,
  StaffPortalTimelineButton
} from '@staff-portal/billing/src/@types/types'
import { useModals as billingUseModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import InvoiceTaskCardContent from '../InvoiceTaskCardContent'
import { useGetInvoiceTaskCard } from '../../data'
import { invoiceDetailsUpdateDataEvents } from '../../../../utils'
import { getTaskCardInitialValues } from '../../../../../commercialDocument/utils/getTaskCardInitialValues'

interface Props {
  taskCardConfig: TaskCardConfig
  TimelineButton: StaffPortalTimelineButton
  /**
   * @deprecated
   */
  task: {
    id: string
    description: string
    status: string
    playbookTemplate?: {
      identifier: string
    } | null
  }
}

const InvoiceTaskCard = ({
  taskCardConfig: {
    title: taskCardTitle,
    subtitle: taskCardSubtitle,
    entityId: invoiceId
  },
  task,
  TimelineButton
}: Props) => {
  const { data: invoice, loading, refetch } = useGetInvoiceTaskCard(invoiceId)
  const { handleOnOpenModal } = billingUseModals()

  useRefetch(invoiceDetailsUpdateDataEvents, refetch)

  const handleOnClick = useCallback(
    ({ currentTarget: { dataset } }: SyntheticEvent<HTMLElement>) => {
      const { value: modalName } = dataset

      const { documentNumber } = invoice
      const initialValues = {
        ...getTaskCardInitialValues(task)
      }

      const payload: ModalData = {
        initialValues,
        nodeId: documentNumber.toString(),
        nodeType: 'invoice'
      }

      switch (modalName) {
        case ModalKey.invoicePay:
          return handleOnOpenModal(modalName, payload)

        case ModalKey.memorandumAdd:
          return handleOnOpenModal(modalName, payload)

        default:
          console.warn('Unhandled: InvoiceTaskCard Action')
      }
    },
    [handleOnOpenModal, invoice, task]
  )

  return (
    <TaskCardLayout loading={loading}>
      {invoice && (
        <InvoiceTaskCardContent
          invoice={invoice}
          taskCardTitle={taskCardTitle}
          taskCardSubtitle={taskCardSubtitle}
          taskPlaybookIdentifier={task.playbookTemplate?.identifier}
          taskStatus={task.status}
          handleOnClick={handleOnClick}
          TimelineButton={TimelineButton}
        />
      )}
    </TaskCardLayout>
  )
}

InvoiceTaskCard.displayName = 'InvoiceTaskCard'

export default InvoiceTaskCard
