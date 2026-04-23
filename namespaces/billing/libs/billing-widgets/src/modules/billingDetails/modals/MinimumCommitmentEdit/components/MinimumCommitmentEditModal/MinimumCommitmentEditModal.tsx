import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import {
  useGetMinimumCommitmentEdit,
  useSetUpdateClientCommitmentMutation
} from '../../data'
import MinimumCommitmentModalForm from '../MinimumCommitmentModalForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const displayName = 'MinimumCommitmentEditModal'
const responseKey = 'updateClientCommitment'

const MinimumCommitmentEditModal: FC<Props> = memo(
  ({ options: { nodeId } }) => {
    const { t: translate } = useTranslation('billingDetails')
    const { handleOnSuccess } = useFormSubmission()
    const [setUpdateClientCommitmentMutation] =
      useSetUpdateClientCommitmentMutation()
    const {
      data: { fullName, commitmentSettings } = {},
      loading,
      initialLoading
    } = useGetMinimumCommitmentEdit(nodeId)
    const initialValues = {
      minimumHours: commitmentSettings?.minimumHours || 0,
      comment: ''
    }
    const title = translate('modals.minimumCommitmentEdit.title' as const, {
      fullName
    })
    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        successMessage: translate(
          'modals.minimumCommitmentEdit.notification.success'
        )
      }),
      responseKey,
      submit: setUpdateClientCommitmentMutation,
      variables: {
        clientId: nodeId
      },
      adjustValues: ({ minimumHours, ...rest }) => ({
        ...rest,
        minimumHours: Number(minimumHours)
      })
    })

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={title} />}
      >
        <MinimumCommitmentModalForm
          handleOnSubmit={handleOnSubmit}
          initialValues={initialValues}
          title={title}
        />
      </ContentLoader>
    )
  }
)

MinimumCommitmentEditModal.displayName = displayName

export default MinimumCommitmentEditModal
