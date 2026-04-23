import { ModalSuspender } from '@staff-portal/modals-service'
import { Alert, Modal } from '@toptal/picasso'
import React from 'react'

import { ContactCompanyPayload } from '../../types'
import SEM from '../SendEmailModal'
import SendEmailModalContent from '../SendEmailModalContent'
import { useGetGeneralEmailContext } from './data'
import { useSendGeneralEmail } from './hooks'

type Props = {
  nodeId: string
  preselectedEmailTemplateId?: string
  onCompleted?: (data?: ContactCompanyPayload) => void
  hideModal: () => void
}

const SendGeneralEmailModalContent = ({
  nodeId,
  preselectedEmailTemplateId,
  onCompleted,
  hideModal
}: Props) => {
  const { emailContext, refetchEmailContext, loading } =
    useGetGeneralEmailContext({ nodeId })
  const handleSubmit = useSendGeneralEmail((data?: ContactCompanyPayload) => {
    hideModal()
    refetchEmailContext()
    onCompleted?.(data)
  })

  if (!emailContext && loading) {
    return <ModalSuspender />
  }

  if (!emailContext) {
    return (
      <>
        <Modal.Title>New Email</Modal.Title>
        <Modal.Content>
          <Alert>The email context is missing.</Alert>
        </Modal.Content>
      </>
    )
  }

  return (
    <SendEmailModalContent
      emailContext={emailContext}
      preselectedEmailTemplateId={preselectedEmailTemplateId}
      handleSubmit={handleSubmit}
      hideModal={hideModal}
    >
      <SEM.EmailTemplatesField autoFocus />
      <SEM.SubjectField />
      <SEM.ToField />
      <SEM.CCSuggestedField />
      <SEM.CCAdditionalField />
      <SEM.EmailBodyField />
      <SEM.SendEmailPendingTasks />
      <SEM.OfacStatusNotification />
      <SEM.GoogleAppsAuthNotification />
      <SEM.LatestEmailMessageSection />
    </SendEmailModalContent>
  )
}

export default SendGeneralEmailModalContent
