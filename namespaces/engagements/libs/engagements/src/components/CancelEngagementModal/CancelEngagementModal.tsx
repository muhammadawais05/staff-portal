import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import ReasonModal from '../ReasonModal'

type Props = {
  hideModal: () => void
  engagementId: string
}

const CancelEngagementModal = ({ hideModal, engagementId }: Props) => (
  <ReasonModal
    hideModal={hideModal}
    engagementId={engagementId}
    title='Cancel Engagement'
    description={
      <>
        <Typography size='inherit'>
          Are you sure you want to cancel this engagement? Talent, client and
          job claimer will be notified with the reason you give.
        </Typography>
        <Container top='xsmall'>
          <Typography size='inherit'>
            The talent will be paid 0% of the amount due, and the client will be
            invoiced 0%.
          </Typography>
        </Container>
      </>
    }
    submitLabel='Cancel Engagement'
    errorMessage='An error occurred, engagement was not canceled.'
    successNotificationMessage='Engagement has been cancelled.'
    mutationName='cancelEngagementTrial'
  />
)

export default CancelEngagementModal
