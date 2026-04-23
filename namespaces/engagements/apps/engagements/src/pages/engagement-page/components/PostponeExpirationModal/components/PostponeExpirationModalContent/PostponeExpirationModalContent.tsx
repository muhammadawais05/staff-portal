import React, { useCallback } from 'react'
import { ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'

import { PostponeEngagementExpirationDocument } from '../../data'
import { useGetPostponeExpirationFormInitialValues } from '../../utils'
import PostponeExpirationForm from '../PostponeExpirationForm'
import {
  MODAL_TITLE,
  PostponeExpirationFormType
} from '../../PostponeExpirationModal'

type Props = {
  hideModal: () => void
  engagementId: string
}

const PostponeExpirationModalContent = ({ hideModal, engagementId }: Props) => {
  const initialValues = useGetPostponeExpirationFormInitialValues()

  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: PostponeEngagementExpirationDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage: 'Interview expiration was postponed.',
        successMessageEmitOptions: {
          type: ENGAGEMENT_UPDATED,
          payload: { engagementId }
        },
        onSuccessAction: hideModal
      }
    })

  const handleSubmit = useCallback(
    ({ expirationDate, comment }: PostponeExpirationFormType) =>
      handleMutationSubmit({
        comment,
        expirationDate,
        engagementId
      }),
    [handleMutationSubmit, engagementId]
  )

  return (
    <ModalForm<PostponeExpirationFormType>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      title={MODAL_TITLE}
    >
      <PostponeExpirationForm loading={loading} hideModal={hideModal} />
    </ModalForm>
  )
}

export default PostponeExpirationModalContent
