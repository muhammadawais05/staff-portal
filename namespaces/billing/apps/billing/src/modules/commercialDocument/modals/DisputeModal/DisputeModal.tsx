import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import {
  ModalKey,
  ApolloContextEvents
} from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { useStore } from '@staff-portal/billing/src/store'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalSkeleton } from '@staff-portal/ui'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import adjustValues from './adjustValues'
import {
  useGetDisputeCommercialDocumentQuery,
  useSetDisputeMutation,
  useSetUpdateDisputeMutation
} from './data'
import DisputeForm from '../../components/DisputeForm'
import { DisputeFormInput } from '../../components/DisputeForm/DisputeForm'

const displayName = 'DisputeModal'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const DisputeModal = ({ options: { nodeId, nodeType } }: Props) => {
  const commercialDocumentType = nodeType as CommercialDocumentType
  const commercialDocumentId = encodeId({ id: nodeId, type: nodeType })
  const { data, loading, initialLoading } = useGetNode(
    useGetDisputeCommercialDocumentQuery
  )({
    id: commercialDocumentId
  })
  const { t: translate } = useTranslation('commercialDocument')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const {
    state: {
      modal: { modalName }
    }
  } = useStore()
  const [setDisputeMutation] = useSetDisputeMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const [setUpdateDisputeMutation] = useSetUpdateDisputeMutation({
    onRootLevelError: handleOnRootLevelError
  })

  const isUpdateDisputeAction = modalName === ModalKey.invoiceDisputeUpdate
  const submitMutation = isUpdateDisputeAction
    ? (setUpdateDisputeMutation as any)
    : setDisputeMutation
  const responseKey = isUpdateDisputeAction
    ? 'updateDispute'
    : 'disputeCommercialDocument'
  const apolloEvent = isUpdateDisputeAction
    ? ApolloContextEvents.invoiceDisputeUpdate
    : ApolloContextEvents.commercialDocumentDisputeRequest
  const includeTalentPayments =
    nodeType === CommercialDocumentType.invoice &&
    !isUpdateDisputeAction &&
    (data as { pendingTalentPayments?: boolean })?.pendingTalentPayments
  const initialValues: DisputeFormInput = {
    comment: '',
    actionDueOn: nodeType === CommercialDocumentType.invoice ? '' : undefined,
    ...(includeTalentPayments ? { disputeTalentPayments: true } : undefined),
    ...(isUpdateDisputeAction
      ? { invoiceId: commercialDocumentId }
      : { commercialDocumentId })
  }

  const submitHandler = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    adjustValues,
    handleSuccess: handleOnSuccess({
      apolloEvent,
      successMessage: translate(
        `modals.dispute.${commercialDocumentType}.notification.success` as const,
        {
          documentNumber: nodeId
        }
      )
    }),
    responseKey,
    submit: submitMutation
  })

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton
          title={translate(
            `modals.dispute.${commercialDocumentType}.title` as const,
            { nodeId }
          )}
        />
      }
    >
      <DisputeForm
        handleSubmit={submitHandler}
        includeTalentPayments={includeTalentPayments}
        initialValues={initialValues}
        nodeId={nodeId}
        nodeType={commercialDocumentType}
      />
    </ContentLoader>
  )
}

DisputeModal.displayName = displayName

export default memo(DisputeModal)
