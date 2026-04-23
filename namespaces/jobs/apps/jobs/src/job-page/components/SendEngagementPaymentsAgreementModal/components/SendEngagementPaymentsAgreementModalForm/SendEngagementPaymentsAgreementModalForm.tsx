import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { ModalForm, Modal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { Container, Typography, Button } from '@toptal/picasso'
import React, { useCallback } from 'react'

import { SendEngagementPaymentsAgreementDocument } from '../../data'

type Props = {
  engagementId: string
  jobTitle: string
  talentFullName: string
  clientFullName: string
  hideModal: () => void
}

const SendEngagementPaymentsAgreementModalForm = ({
  engagementId,
  jobTitle,
  talentFullName,
  clientFullName,
  hideModal
}: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: SendEngagementPaymentsAgreementDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage:
          'The Semi-Monthly Payments Agreement was successfully sent to the talent.',
        successMessageEmitOptions: {
          type: ENGAGEMENT_UPDATED,
          payload: { engagementId }
        },
        onSuccessAction: hideModal
      }
    })

  const handleSubmit = useCallback(
    () => handleMutationSubmit({ engagementId }),
    [handleMutationSubmit, engagementId]
  )

  return (
    <ModalForm
      onSubmit={handleSubmit}
      title='Send Semi-Monthly Payments Agreement'
    >
      <Modal.Content>
        <Typography as='div' size='medium'>
          <Typography weight='semibold' as='strong'>
            Job title:
          </Typography>{' '}
          {jobTitle}
          <Container top='medium'>
            <Typography weight='semibold' as='strong'>
              Talent name:
            </Typography>{' '}
            {talentFullName}
          </Container>
          <Container top='medium'>
            <Typography weight='semibold' as='strong'>
              Client name:
            </Typography>{' '}
            {clientFullName}
          </Container>
        </Typography>
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>

        <Button variant='positive' onClick={handleSubmit} loading={loading}>
          Send Payments Agreement
        </Button>
      </Modal.Actions>
    </ModalForm>
  )
}

export default SendEngagementPaymentsAgreementModalForm
