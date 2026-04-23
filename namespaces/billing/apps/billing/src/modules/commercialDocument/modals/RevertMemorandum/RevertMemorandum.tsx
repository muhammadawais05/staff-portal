import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import RevertMemorandumForm from '../../components/RevertMemorandumForm'
import { useGetRevertMemorandumQuery } from '../../../memorandum/data'
import { useRevertCommercialDocumentMemorandumMutation } from './data'

const responseKey = 'revertCommercialDocumentMemorandum'
const displayName = 'RevertMemorandum'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const RevertMemorandum = ({ options: { nodeId, nodeType } }: Props) => {
  const memorandumId = encodeId({
    id: nodeId,
    type: nodeType
  })
  const { t: translate } = useTranslation('memorandum')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [revertMemorandumMutation] =
    useRevertCommercialDocumentMemorandumMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const {
    data: { amount, balance, number, document, receiver } = {},
    loading,
    initialLoading
  } = useGetNode(useGetRevertMemorandumQuery)({ nodeId: memorandumId })

  const initialValues = {
    commercialDocumentId: document?.id ?? '',
    memorandumId,
    comment: translate(`revertModal.fields.comment.initialValue`, {
      balance: balance?.toLowerCase(),
      number
    })
  }

  const handleSuccess = handleOnSuccess({
    apolloEvent: ApolloContextEvents.memorandumRevert,
    successMessage: translate(`revertModal.notification.success`)
  })
  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess,
    responseKey,
    submit: revertMemorandumMutation
  })

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton title={translate(`revertModal.title`)} />
      }
    >
      <RevertMemorandumForm
        handleOnSubmit={handleOnSubmit}
        initialValues={initialValues}
        amount={amount ?? ''}
        number={number ?? 0}
        receiverName={receiver?.fullName}
      />
    </ContentLoader>
  )
}

RevertMemorandum.displayName = displayName

export default memo(RevertMemorandum)
