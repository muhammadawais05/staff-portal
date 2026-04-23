import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { UpdateCommercialDocumentDueDateInput } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { parse } from '@staff-portal/billing/src/_lib/dateTime'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import {
  useGetCommercialDocumentUpdateDueDateQuery,
  useSetUpdateCommercialDocumentDueDateMutation
} from '../../data'
import adjustValues from './adjustValues'
import CommercialDocumentUpdateDueDateModalForm from '../CommercialDocumentUpdateDueDateModalForm'

const responseKey = 'updateCommercialDocumentDueDate'
const displayName = 'CommercialDocumentUpdateDueDateModal'

type InputValues = Omit<UpdateCommercialDocumentDueDateInput, 'dueDate'> & {
  dueDate?: Date
}

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

export const CommercialDocumentUpdateDueDateModal: FC<Props> = memo<Props>(
  ({ options: { nodeId, nodeType } }) => {
    const commercialDocumentType = nodeType as CommercialDocumentType
    const {
      data: document,
      loading,
      initialLoading
    } = useGetNode(useGetCommercialDocumentUpdateDueDateQuery)({
      nodeId: encodeId({
        id: nodeId,
        type: nodeType
      })
    })
    const { t: translate } = useTranslation('commercialDocument')
    const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
    const [updateCommercialDocumentDueDateGatewayMutation] =
      useSetUpdateCommercialDocumentDueDateMutation({
        onRootLevelError: handleOnRootLevelError
      })

    const { documentNumber, dueDate, id: commercialDocumentId } = document || {}
    const i18Key = 'modals.updateCommercialDocumentDueDateModal'

    const initialValues: Omit<InputValues, 'commercialDocumentId'> = {
      comment: '',
      dueDate: dueDate ? parse(dueDate).toJSDate() : undefined
    }

    const variables: Pick<InputValues, 'commercialDocumentId'> = {
      commercialDocumentId
    }

    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.commercialDocumentUpdateDueDate,
        successMessage: translate(
          `${i18Key}.notification.success.${commercialDocumentType}` as const,
          {
            documentNumber
          }
        )
      }),
      adjustValues,
      responseKey,
      submit: updateCommercialDocumentDueDateGatewayMutation,
      variables
    })

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton
            title={translate(
              `${i18Key}.title.${commercialDocumentType}` as const,
              {
                documentNumber: nodeId
              }
            )}
          />
        }
      >
        <CommercialDocumentUpdateDueDateModalForm
          nodeId={nodeId}
          nodeType={commercialDocumentType}
          handleOnSubmit={handleOnSubmit}
          initialValues={initialValues}
          documentNumber={documentNumber}
        />
      </ContentLoader>
    )
  }
)

CommercialDocumentUpdateDueDateModal.displayName = displayName

export default CommercialDocumentUpdateDueDateModal
