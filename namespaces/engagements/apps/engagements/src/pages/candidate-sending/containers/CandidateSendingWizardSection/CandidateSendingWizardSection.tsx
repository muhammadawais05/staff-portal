import React from 'react'
import { Section } from '@toptal/picasso'

import {
  NewEngagementWizard,
  NewEngagementWizardLoader
} from '../../components'
import { useCandidateSendingContext } from '../../hooks'

export interface Props {
  roleName: string | null
  roleNameLoading: boolean
}

const CandidateSendingWizardSection = ({
  roleName,
  roleNameLoading
}: Props) => {
  const { displayedSteps, currentStep, initialLoading, hasPendingAssignment } =
    useCandidateSendingContext()

  if (initialLoading || roleNameLoading) {
    return <NewEngagementWizardLoader />
  }

  if (!roleName || !displayedSteps?.length) {
    return null
  }

  const roleNamePrefix = hasPendingAssignment ? 'assign' : 'send'

  return (
    <Section
      title={`Follow these steps to ${roleNamePrefix} ${roleName.toLowerCase()} to position`}
      data-testid='candidate-sending-wizard-section'
    >
      <NewEngagementWizard
        steps={displayedSteps}
        currentStep={currentStep}
        roleName={roleName}
      />
    </Section>
  )
}

export default CandidateSendingWizardSection
