import React from 'react'
import { Container, Button, Typography } from '@toptal/picasso'
import { Modal, ModalComponentBaseProps } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { useApproveTalentIdVerification } from '../../data/approve-talent-id-verification'

const ERROR_MESSAGE = 'Unable to approve talent ID verification.'

export interface Props extends ModalComponentBaseProps {
  talentId: string
}

export const ApproveIdVerificationModal = ({ talentId, hideModal }: Props) => {
  const { showError, showSuccess } = useNotifications()
  const emitMessage = useMessageEmitter()

  const onError = () => {
    showError(ERROR_MESSAGE)
  }

  const [approveTalentIdVerification, { loading }] =
    useApproveTalentIdVerification({
      onError,
      onCompleted: ({ approveTalentIdVerification: result }) => {
        if (result?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
          showSuccess('Talent ID verification approved.')
          hideModal()

          return
        }

        if (result?.errors) {
          showError(concatMutationErrors(result?.errors, ERROR_MESSAGE))
          hideModal()

          return
        }

        onError()
      }
    })

  const handleClick = () =>
    approveTalentIdVerification({ variables: { input: { talentId } } })

  return (
    <Modal
      onClose={hideModal}
      size='small'
      open
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'approveTalentIdVerification'
      }}
      data-testid='approve-id-verification-modal'
    >
      <Modal.Title>Approve ID Verification</Modal.Title>
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Do you really want to approve the ID verification for this talent?
            This action will allow the talent to schedule the 2nd technical
            interview without ID verification.
          </Typography>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal}>
          Cancel
        </Button>
        <Button
          variant='negative'
          onClick={handleClick}
          loading={loading}
          data-testid='confirm-id-verification-approval'
        >
          Approve
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ApproveIdVerificationModal
