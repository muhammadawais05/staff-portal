import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { ResolveDisputeOfCommercialDocumentInput } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import DisputeResolveModalForm from '../DisputeResolveModalForm'
import {
  useGetDisputeResolveQuery,
  useSetResolveDisputeResolutionMutation
} from '../../data'

type InputValues = Omit<
  ResolveDisputeOfCommercialDocumentInput,
  'commercialDocumentId'
>

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const responseKey = 'resolveDisputeOfCommercialDocument'
const displayName = 'DisputeResolveModal'

const initialValues: InputValues = {
  comment: '',
  resolveTalentPaymentDisputes: true
}

const DisputeResolveModal: FC<Props> = memo<Props>(
  ({ options: { nodeId, nodeType } }) => {
    const {
      data: document,
      loading,
      initialLoading
    } = useGetNode(useGetDisputeResolveQuery)({
      id: encodeId({
        id: nodeId,
        type: nodeType
      })
    })
    const { id: commercialDocumentId, documentNumber } = document || {}

    const { t: translate } = useTranslation('commercialDocument')
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [setResolveDisputeResolutionMutation] =
      useSetResolveDisputeResolutionMutation({
        onRootLevelError: handleOnRootLevelError
      })

    const variables: Pick<
      ResolveDisputeOfCommercialDocumentInput,
      'commercialDocumentId'
    > = {
      commercialDocumentId
    }

    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.commercialDocumentDisputeResolve,
        outboundEvent: {
          key: ApolloContextEvents.commercialDocumentDisputeResolve
        },
        successMessage: translate(
          'modals.disputeResolveModal.notification.success',
          {
            type: nodeType,
            documentNumber
          }
        )
      }),
      responseKey,
      submit: setResolveDisputeResolutionMutation,
      variables
    })

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton
            title={translate('modals.disputeResolveModal.title', {
              type: nodeType,
              documentNumber: nodeId
            })}
          />
        }
      >
        <DisputeResolveModalForm
          type={nodeType as CommercialDocumentType}
          handleOnSubmit={handleOnSubmit}
          initialValues={initialValues}
          documentNumber={documentNumber}
        />
      </ContentLoader>
    )
  }
)

DisputeResolveModal.displayName = displayName

export default DisputeResolveModal
