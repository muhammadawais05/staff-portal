import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { FormSpy } from '@toptal/picasso-forms'

import BaseRejectEngagementTrialModal from '../BaseRejectEngagementTrialModal'

type Props = {
  hideModal: () => void
  engagementId: string
  talentType?: string
}

const RejectApprovedEngagementTrialModal = ({
  hideModal,
  engagementId,
  talentType
}: Props) => (
  <BaseRejectEngagementTrialModal
    hideModal={hideModal}
    engagementId={engagementId}
    talentType={talentType}
    mutationName='rejectApprovedEngagementTrial'
    extraMessage={
      <Container top='xsmall'>
        <Typography size='medium' data-testid='extra-message-id'>
          <FormSpy>
            {({ values }) => {
              const percent =
                values.identifier === 'talent_asked_to_leave' ? 0 : 50

              return `The talent will be paid ${percent}% of the amount due, and the client will be invoiced 0%.`
            }}
          </FormSpy>
        </Typography>
      </Container>
    }
  />
)

export default RejectApprovedEngagementTrialModal
