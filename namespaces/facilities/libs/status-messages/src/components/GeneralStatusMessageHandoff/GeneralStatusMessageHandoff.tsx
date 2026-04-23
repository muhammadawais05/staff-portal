import React from 'react'
// eslint-disable-next-line no-restricted-imports
import { Typography, Modal, Button, Link as PicassoLink } from '@toptal/picasso'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal, useNotifications } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { getTransferredWorkPath } from '@staff-portal/routes'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { StatusMessageNotification } from '@staff-portal/ui'

import { useFinishRelatedHandoffs } from './data/finish-related-handoffs'

const FINISH_RELATED_HANDOFFS_ERROR = 'Unable to transfer clients'

interface HandoffModalProps {
  open: boolean
  onClose: () => void
}

const HandoffModal = ({ open, onClose }: HandoffModalProps) => {
  const { showError, showSuccess } = useNotifications()
  const [finishRelatedHandoffs, { loading }] = useFinishRelatedHandoffs({
    onError: () => showError(FINISH_RELATED_HANDOFFS_ERROR),
    onCompleted: data => {
      if (!data.finishRelatedHandoffs?.success) {
        return showError(
          concatMutationErrors(
            data.finishRelatedHandoffs?.errors || [],
            FINISH_RELATED_HANDOFFS_ERROR
          )
        )
      }

      showSuccess(
        'Your vacation has been ended and all clients have been transferred back to you. Please check your task list and get in touch with the matchers who were covering you.'
      )
    }
  })

  return (
    <Modal size='small' open={open} onClose={onClose}>
      <Modal.Title data-testid='finish-handoff-modal-title'>
        Transfer clients
      </Modal.Title>
      <Modal.Content>
        <Typography size='medium'>
          All of the clients that you were processing before leaving for
          vacation will be transferred back to you.
          <br />
          Are you sure you want to do this?
        </Typography>
      </Modal.Content>
      <Modal.Actions>
        <Button
          as={Link as typeof PicassoLink}
          variant='secondary'
          href={getTransferredWorkPath()}
          data-testid='show-clients-button'
        >
          Show Clients
        </Button>
        <Button
          variant='positive'
          data-testid='transfer-clients-button'
          onClick={() => finishRelatedHandoffs()}
          loading={loading}
        >
          Transfer Clients
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const GeneralStatusMessageHandoff = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <StatusMessageNotification variant='yellow'>
        If you are back from vacation, please{' '}
        <Link data-testid='finish-handoff-action' onClick={showModal}>
          click here to reclaim your clients
        </Link>
        .
      </StatusMessageNotification>
      <HandoffModal open={isOpen} onClose={hideModal} />
    </>
  )
}

export default GeneralStatusMessageHandoff
