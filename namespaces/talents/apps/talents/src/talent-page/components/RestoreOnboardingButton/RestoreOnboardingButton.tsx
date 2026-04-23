import { Button, Container } from '@toptal/picasso'
import React from 'react'
import { TalentFragment } from '@staff-portal/talents'
import { Operation } from '@staff-portal/operations'

import { useRestoreOnboardingModal } from '../RestoreOnboardingModal'

export interface Props {
  talent: TalentFragment
}

const RestoreOnboardingButton = ({
  talent: {
    id: talentId,
    operations: { restoreOnboardingTalent }
  }
}: Props) => {
  const { showModal } = useRestoreOnboardingModal({
    talentId
  })

  return (
    <Operation
      operation={restoreOnboardingTalent}
      render={disabled => (
        <Container left='xsmall'>
          <Button
            size='small'
            variant='secondary'
            disabled={disabled}
            onClick={showModal}
            data-testid='restore-onboarding-button'
          >
            Restore Onboarding
          </Button>
        </Container>
      )}
    />
  )
}

export default RestoreOnboardingButton
