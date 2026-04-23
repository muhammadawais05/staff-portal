import React from 'react'
import { Container, Button, Typography } from '@toptal/picasso'
import { Modal, ModalComponentBaseProps } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { useDiscardTalentPrescreeningVideo } from '../../data/discard-talent-prescreening-video'

const ERROR_MESSAGE = 'Unable to discard submitted recording.'

export interface Props extends ModalComponentBaseProps {
  talentId: string
}

const DiscardRecordingModal = ({ talentId, hideModal }: Props) => {
  const { showError, showSuccess } = useNotifications()
  const emitMessage = useMessageEmitter()

  const onError = () => {
    showError(ERROR_MESSAGE)
  }

  const [discardTalentPrescreeningVideo, { loading }] =
    useDiscardTalentPrescreeningVideo({
      onError,
      onCompleted: ({ discardTalentPrescreeningVideo: result }) => {
        if (result?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
          showSuccess('Talent submitted recording discarded.')
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
    discardTalentPrescreeningVideo({ variables: { input: { talentId } } })

  return (
    <Modal onClose={hideModal} size='small' open>
      <Modal.Title>Discard Recording</Modal.Title>
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Do you really want to discard submitted recording? This action will
            allow talent to submit a new recording.
          </Typography>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal}>
          Cancel
        </Button>
        <Button variant='negative' onClick={handleClick} loading={loading}>
          Discard
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DiscardRecordingModal
