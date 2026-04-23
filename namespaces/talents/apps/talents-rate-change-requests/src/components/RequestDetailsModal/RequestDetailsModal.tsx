import React from 'react'
import { Button } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'

import { RequestDetailsModalContent } from './components'
import { RateChangeRequestFragment } from '../../data'

type Props = Pick<
  RateChangeRequestFragment,
  | 'currentRate'
  | 'desiredRate'
  | 'talent'
  | 'engagement'
  | 'createdAt'
  | 'answers'
> & {
  hideModal: () => void
}

const RequestDetailsModal = ({ hideModal, ...props }: Props) => (
  <Modal onClose={hideModal} size='large' open>
    <Modal.Title>Active Engagement Request Details</Modal.Title>
    <Modal.Content>
      <RequestDetailsModalContent {...props} />
    </Modal.Content>
    <Modal.Actions>
      <Button variant='primary' onClick={hideModal}>
        Close
      </Button>
    </Modal.Actions>
  </Modal>
)

export default RequestDetailsModal
