import React from 'react'
import { Button, Typography, Container } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'

export interface Props {
  onSubmit?: () => void
  hideModal: () => void
  loading: boolean | undefined
}

const DismissCallModal = ({ onSubmit, hideModal, loading }: Props) => {
  const handleSubmit = async () => {
    await onSubmit?.()

    hideModal()
  }

  return (
    <Modal onClose={hideModal} open size='small'>
      <Modal.Title>Dismiss Call</Modal.Title>
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            You should only dismiss a call if it was related to a non-Toptal
            matter. Any info related to the user or purpose of the call will be
            marked as N/A within Call History.
          </Typography>
        </Container>
        <Container bottom='medium'>
          <Typography size='medium'>
            Are you sure that you want to dismiss the call?
          </Typography>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button
          variant='secondary'
          data-testid='dismiss-cancel-button'
          onClick={hideModal}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          disabled={loading}
          variant='positive'
          data-testid='dismiss-button'
          onClick={handleSubmit}
        >
          Dismiss
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DismissCallModal
