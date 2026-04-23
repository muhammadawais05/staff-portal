import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import ReasonModal from '../ReasonModal'

type Props = {
  hideModal: () => void
  engagementId: string
}

const RejectEngagementCandidateModal = ({ hideModal, engagementId }: Props) => (
  <ReasonModal
    hideModal={hideModal}
    engagementId={engagementId}
    title='Reject Candidate'
    description={
      <>
        <Typography size='inherit'>
          Are you sure you want to reject this candidate? If you do this, a
          Toptal recruiter will be notified and immediately start the screening
          process for a new candidate for this position.
        </Typography>
        <Container top='xsmall'>
          <Typography size='inherit'>
            Why you are rejecting this candidate?
          </Typography>
        </Container>
      </>
    }
    submitLabel='Reject Candidate'
    errorMessage='An error occured, Candidate was not rejected.'
    successNotificationMessage='Candidate has been rejected.'
    mutationName='rejectEngagementOnInterview'
  />
)

export default RejectEngagementCandidateModal
