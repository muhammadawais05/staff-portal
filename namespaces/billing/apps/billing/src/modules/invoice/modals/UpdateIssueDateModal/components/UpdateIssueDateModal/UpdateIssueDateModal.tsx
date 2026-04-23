import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
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

import adjustValues from './adjustValues'
import {
  useGetUpdateIssueDateQuery,
  useSetUpdateIssueDateMutation
} from '../../data'
import UpdateIssueDateModalForm from '../UpdateIssueDateModalForm'

const displayName = 'UpdateIssueDateModal'
const responseKey = 'updateIssueDate'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

export const UpdateIssueDateModal: FC<Props> = memo<Props>(
  ({ options: { nodeId: documentNumber } }) => {
    const invoiceId = encodeId({ id: documentNumber, type: 'invoice' })
    const {
      data: document,
      loading,
      initialLoading
    } = useGetNode(useGetUpdateIssueDateQuery)({
      nodeId: invoiceId
    })
    const { t: translate } = useTranslation('invoice')
    const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
    const [updateIssueDateGatewayMutation] = useSetUpdateIssueDateMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const { issueDate, createdOn } = document || {}

    const initialValues = {
      invoiceId,
      comment: '',
      issueDate: issueDate
        ? parse(issueDate).toJSDate()
        : createdOn
        ? parse(createdOn).toJSDate()
        : undefined
    }

    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.invoiceUpdateIssueDate,
        successMessage: translate(
          'updateIssueDateModalForm.notification.success',
          {
            documentNumber: documentNumber
          }
        )
      }),
      adjustValues,
      responseKey,
      submit: updateIssueDateGatewayMutation
    })

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton
            title={translate(`updateIssueDateModalForm.title`, {
              documentNumber
            })}
          />
        }
      >
        <UpdateIssueDateModalForm
          documentNumber={documentNumber}
          handleOnSubmit={handleOnSubmit}
          initialValues={initialValues}
          minValue={createdOn}
        />
      </ContentLoader>
    )
  }
)

UpdateIssueDateModal.displayName = displayName

export default UpdateIssueDateModal
