import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import {
  formatCleanNumberValue,
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import {
  useGetRefundClientCreditBalanceQuery,
  useSetRefundClientCreditBalanceMutation
} from '../../data'
import RefundClientCreditBalanceForm from '../RefundClientCreditBalanceForm'

const responseKey = 'refundClientCreditBalance'
const displayName = 'RefundCreditModal'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const RefundCreditModal = ({ options: { nodeId, nodeType } }: Props) => {
  const { t: translate } = useTranslation('billingBasicInfo')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [refundClientCreditBalanceMutation] =
    useSetRefundClientCreditBalanceMutation({
      onRootLevelError: handleOnRootLevelError
    })

  const clientId = encodeId({ type: nodeType, id: nodeId })

  const {
    data: { availablePrepaymentBalanceNullable, fullName } = {},
    loading,
    initialLoading
  } = useGetNode(useGetRefundClientCreditBalanceQuery)({ clientId })

  const initialValues = {
    amount: formatCleanNumberValue(availablePrepaymentBalanceNullable || ''),
    clientId,
    comment: '',
    notifyReceiver: false
  }

  const handleSuccess = handleOnSuccess({
    apolloEvent: ApolloContextEvents.clientRefundCreditBalance,
    successMessage: translate(`refundModal.notification.success`)
  })

  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess,
    responseKey,
    submit: refundClientCreditBalanceMutation
  })

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton title={translate('refundModal.title')} />
      }
    >
      <RefundClientCreditBalanceForm
        initialValues={initialValues}
        clientName={fullName}
        handleOnSubmit={handleOnSubmit}
      />
    </ContentLoader>
  )
}

RefundCreditModal.displayName = displayName

export default memo(RefundCreditModal)
