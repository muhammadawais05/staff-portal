import React from 'react'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useTranslation } from 'react-i18next'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import adjustValues from './adjustValues'
import {
  useGetPurchaseOrderLinesForInvoice,
  useAssignPurchaseOrderLineToInvoiceMutation
} from '../../data'
import AssignPurchaseOrderModalForm from './components/AssignPurchaseOrderModalForm'

export type Props = {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const responseKey = 'assignPurchaseOrderLine'

const AssignPurchaseOrderModal = ({
  options: { nodeId: invoiceId }
}: Props) => {
  const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
  const { t: translate } = useTranslation('invoice')

  const { data, loading, initialLoading } =
    useGetPurchaseOrderLinesForInvoice(invoiceId)

  const [assignPurchaseOrderLineToInvoice] =
    useAssignPurchaseOrderLineToInvoiceMutation({
      onRootLevelError: handleOnRootLevelError
    })

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      successMessage: translate(
        'assignPurchaseOrderModal.notification.success.assign'
      ),
      apolloEvent: ApolloContextEvents.jobNextPurchaseOrderEdit
    }),
    responseKey,
    variables: { invoiceId },
    submit: assignPurchaseOrderLineToInvoice,
    adjustValues
  })

  return (
    <ContentLoader
      as='fragment'
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton title={translate('assignPurchaseOrderModal.title')} />
      }
    >
      <AssignPurchaseOrderModalForm
        handleOnSubmit={handleOnSubmit}
        invoice={data}
      />
    </ContentLoader>
  )
}

export default AssignPurchaseOrderModal
