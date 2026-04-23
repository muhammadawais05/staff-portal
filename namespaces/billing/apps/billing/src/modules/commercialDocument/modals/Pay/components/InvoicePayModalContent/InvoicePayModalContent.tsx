import React, { useCallback, useEffect, useState } from 'react'
import { FinalForm, FormRenderProps } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import {
  ApplyUnallocatedMemorandumsToCommercialDocumentInput,
  DocumentStatus,
  ApplyUnallocatedMemorandumsToCommercialDocumentPayload
} from '@staff-portal/graphql/staff'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import {
  getBillingOptionsFromClient,
  InvoicePayModalFormValues
} from '@staff-portal/billing/src/_lib/helpers/billing'
import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'
import * as OperationHelpers from '@staff-portal/billing/src/_lib/helpers/operations'
import AlertModal from '@staff-portal/billing/src/components/AlertModal/AlertModal'
import {
  formatDateURL,
  getCurrentTime
} from '@staff-portal/billing/src/_lib/dateTime'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'

import InvoiceCollectBadDebtModal from '../../../../../invoice/modals/CollectBadDebt'
import InvoicePayModalFullyCovered from '../InvoicePayModalFullyCovered'
import InvoicePayModalForm from '../InvoicePayModalForm'
import { PENDING_TO_RECEIVE_STATUSES } from '../../../../../invoice/utils'
import { useCreateTransferInvoiceMutation } from '../../data'
import adjustValues from './adjustValues'
import { InvoiceModalFragment } from '../../data/getPayModalInvoice.graphql.types'
import ApplyUnallocatedMemorandums from '../../../ApplyUnallocatedMemorandums'

const responseKey = 'createTransferInvoice'
const displayName = 'InvoicePayModalContent'

interface Props {
  invoice: InvoiceModalFragment
}

// eslint-disable-next-line max-statements
const InvoicePayModalContent = ({ invoice }: Props) => {
  const { t: translate } = useTranslation(['common', 'invoice'])
  const [modal, setModal] = useState('')
  const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
  const { handleOnCloseModal } = useModals()
  const [invoiceCreateTransferMutation] = useCreateTransferInvoiceMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const {
    expectedClearanceDateForNewPendingReceipt: pendingReceiptOn,
    cleanAmountToPay,
    discountedAmountToPay,
    documentNumber,
    id,
    operations,
    status,
    subjectObject
  } = invoice
  const { billingOptions, preferredBillingOption } = subjectObject
  const availablePaymentSources = getBillingOptionsFromClient({
    billingOptions,
    preferredBillingOption
  })

  const isPendingToReceive = PENDING_TO_RECEIVE_STATUSES.includes(status)
  const undiscountedAmount = Number(cleanAmountToPay).toFixed(2)
  const discountedAmount = Number(discountedAmountToPay).toFixed(2)
  const noAmountOutstanding = Number(cleanAmountToPay) <= 0

  const nextModal =
    status === DocumentStatus.IN_COLLECTIONS
      ? ModalKey.invoiceCollectBadDebt
      : ModalKey.invoicePay

  const canApplyUnallocatedMemorandums = OperationHelpers.isOperationEnabled({
    key: 'applyUnallocatedMemorandumsToCommercialDocument',
    operations
  })

  const handleOnNextModal = useCallback(
    (
      mutationInput?: ApplyUnallocatedMemorandumsToCommercialDocumentInput,
      mutationResult?: ApplyUnallocatedMemorandumsToCommercialDocumentPayload
    ) => {
      // close the modal if the invoice was fully covered by
      // applying memos or prepayments
      if (
        invoice.status !== DocumentStatus.PAID &&
        mutationResult?.commercialDocument?.status === DocumentStatus.PAID
      ) {
        handleOnCloseModal()
      } else {
        setModal(nextModal)
      }
    },
    [handleOnCloseModal, invoice, nextModal]
  )

  useEffect(() => {
    if (!canApplyUnallocatedMemorandums) {
      handleOnNextModal()
    } else if (modal === '') {
      setModal(ModalKey.invoiceApplyMemos)
    }
  }, [canApplyUnallocatedMemorandums, handleOnNextModal, modal, setModal])

  if (modal === ModalKey.invoiceApplyMemos) {
    return (
      <ApplyUnallocatedMemorandums
        isApplyMemosAndPayFlow
        commercialDocumentId={id}
        onStepCompleted={handleOnNextModal}
      />
    )
  }

  if (modal === ModalKey.invoiceCollectBadDebt) {
    return <InvoiceCollectBadDebtModal invoiceId={id} />
  }

  if (!isPendingToReceive) {
    return (
      <AlertModal
        message={translate('invoice:payModal.notPending')}
        title={translate('invoice:payModal.title', { documentNumber })}
      />
    )
  }

  if (noAmountOutstanding) {
    return (
      <InvoicePayModalFullyCovered
        clientId={subjectObject.id}
        documentNumber={documentNumber}
        isInvoicePaid={status === DocumentStatus.paid}
      />
    )
  }

  const defaultPaymentDate = formatDateURL(getCurrentTime())

  const initialValues: InvoicePayModalFormValues = {
    achProcessingDate: defaultPaymentDate,
    amount: undiscountedAmount,
    amountCompareKey: '',
    billingOptionId: '',
    comment: '',
    date: defaultPaymentDate,
    discountedAmount,
    invoiceId: id,
    paymentMethod: '',
    paymentSource: '',
    pendingReceiptOn,
    pendingReceiptPaymentMethod: '',
    unappliedCashEffectiveDate: defaultPaymentDate,
    processingDate: defaultPaymentDate,
    undiscountedAmount
  }

  return (
    <FinalForm
      render={(formRenderProps: FormRenderProps<InvoicePayModalFormValues>) => (
        <InvoicePayModalForm
          availablePaymentSources={availablePaymentSources}
          invoice={invoice}
          formRenderProps={formRenderProps}
        />
      )}
      // needed so the values don't get updated on refetch
      keepDirtyOnReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit({
        adjustValues: allValues =>
          adjustValues(allValues, availablePaymentSources),
        handleError: handleOnSubmissionError(responseKey),
        handleSuccess: handleOnSuccess({
          apolloEvent: ApolloContextEvents.invoicePay,
          successMessage: translate('invoice:payModal.notification.success', {
            documentNumber
          })
        }),
        responseKey,
        submit: invoiceCreateTransferMutation
      })}
    />
  )
}

InvoicePayModalContent.displayName = displayName

export default InvoicePayModalContent
