import React, { ReactNode } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { getRoleTypeText } from '@staff-portal/facilities'

import { ReasonModal } from '../../../index'

type Props = {
  hideModal: () => void
  engagementId: string
  talentType?: string
  extraMessage?: ReactNode
  mutationName: 'rejectApprovedEngagementTrial' | 'rejectEngagementTrial'
}

const BaseRejectEngagementTrialModal = ({
  hideModal,
  engagementId,
  talentType,
  extraMessage,
  mutationName
}: Props) => {
  const role = getRoleTypeText(talentType)

  if (!talentType) {
    return null
  }

  return (
    <ReasonModal
      hideModal={hideModal}
      engagementId={engagementId}
      title={`Reject ${role}`}
      description={
        <>
          <Typography size='inherit'>
            {`Are you sure you want to reject this ${role.toLowerCase()}? If you do this, a
            Toptal recruiter will be notified and immediately start the
            screening process for a new ${role.toLowerCase()} for this position.`}
          </Typography>
          <Container top='xsmall'>
            <Typography size='inherit'>
              {`Why you are rejecting this ${role.toLowerCase()}?`}
            </Typography>
          </Container>
          {extraMessage}
        </>
      }
      submitLabel={`Reject ${role}`}
      errorMessage={`An error occured, ${role} was not rejected.`}
      successNotificationMessage={`${role} has been rejected.`}
      mutationName={mutationName}
    />
  )
}

export default BaseRejectEngagementTrialModal
