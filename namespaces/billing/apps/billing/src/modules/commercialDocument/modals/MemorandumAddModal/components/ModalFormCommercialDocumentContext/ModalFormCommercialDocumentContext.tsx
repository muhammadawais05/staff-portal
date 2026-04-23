import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@toptal/picasso'
import {
  AddMemorandumToCommercialDocumentInput,
  InvoiceKind
} from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import {
  useGetAddMemorandumQuery,
  GetAddMemorandumInvoiceFragment as InvoiceFragment,
  GetAddMemorandumPaymentFragment as PaymentFragment
} from '../../data'
import { MemorandumAddModalFormContext } from '../../utils/types'
import { useSetAddMemorandumToCommercialDocumentMutation } from '../../../../data'
import { canAffectCommissionRevenue } from '../../utils'
import { PENDING_TO_PAY_STATUSES } from '../../../../../invoice/utils'

const addMemorandumMutationName = 'addMemorandumToCommercialDocument'

type InputValues = Omit<
  AddMemorandumToCommercialDocumentInput,
  'commercialDocumentId'
>

type CommercialDocument = InvoiceFragment | PaymentFragment

const displayName = 'MemorandumAddModalFormCommercialDocumentContext'

const ModalFormCommercialDocumentContext: MemorandumAddModalFormContext<InputValues> =
  ({ children, nodeType, nodeId, externalInitialValues }) => {
    const {
      data: document = {} as CommercialDocument,
      loading,
      initialLoading
    } = useGetNode(useGetAddMemorandumQuery)({
      id: nodeType && nodeId ? encodeId({ type: nodeType, id: nodeId }) : ''
    })

    const { t: translate } = useTranslation('memorandum')
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [addMemorandumMutation] =
      useSetAddMemorandumToCommercialDocumentMutation({
        onRootLevelError: handleOnRootLevelError
      })

    const { id: commercialDocumentId, documentNumber, status } = document
    const variables: Pick<
      AddMemorandumToCommercialDocumentInput,
      'commercialDocumentId'
    > = {
      commercialDocumentId
    }

    // invoice specific only :
    const { invoiceKind, commissionable } = document as Partial<InvoiceFragment>

    // payment specific only :
    const { paymentKind } = document as Partial<PaymentFragment>

    const canAffectCommissions = canAffectCommissionRevenue({
      nodeType,
      commissionable,
      invoiceKind,
      paymentKind
    })

    const initialValues: Partial<InputValues> = {
      // @ts-expect-error amount string/number
      amount: null,
      ...externalInitialValues,
      affectsCommissions: canAffectCommissions,
      notifyReceiver: invoiceKind !== InvoiceKind.COMPANY_DEPOSIT
    }

    const isConsolidatedInvoice = invoiceKind === InvoiceKind.CONSOLIDATED
    const hasPendingToPayStatus = PENDING_TO_PAY_STATUSES.includes(status)
    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(addMemorandumMutationName),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.memorandumAdd,
        outboundEvent: { key: ApolloContextEvents.memorandumAdd },
        successMessage: translate(
          `addModal.notification.${
            isConsolidatedInvoice && hasPendingToPayStatus
              ? 'consolidatedSuccess'
              : 'success'
          }` as const,
          { documentNumber }
        )
      }),
      responseKey: addMemorandumMutationName,
      submit: addMemorandumMutation,
      variables
    })

    return (
      <Container data-testid={displayName}>
        {children({
          document,
          loading,
          initialLoading,
          initialValues,
          handleOnSubmit,
          showReceiverField: false
        })}
      </Container>
    )
  }

ModalFormCommercialDocumentContext.displayName = displayName

export default memo(ModalFormCommercialDocumentContext)
