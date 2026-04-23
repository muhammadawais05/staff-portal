import React from 'react'
import { Container } from '@toptal/picasso'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import CandidateSendingWizardSection from '../CandidateSendingWizardSection'
import * as S from './styles'
import { useCandidateSendingContext, useGetRoleTitle } from '../../hooks'
import CandidateSendingPositionStep from '../CandidateSendingPositionStep'
import CandidateSendingSkillsStep from '../CandidateSendingSkillsStep'
import CandidateSendingDetailsStep from '../CandidateSendingDetailsStep'
import CandidateSendingAvailabilityStep from '../CandidateSendingAvailabilityStep'
import { ContentStatusMessage } from '../../components'
import CandidateSendingNextStep from '../CandidateSendingNextStep'
import CandidateSendingPitchStep from '../CandidateSendingPitchStep'
import CandidateSendingFeedbackStep from '../CandidateSendingFeedbackStep/CandidateSendingFeedbackStep'
import { AdditionalStatusMessages } from './components'

export interface Props {
  jobId: string | undefined
  talentId: string | undefined
}

const CandidateSendingPageContent = ({ jobId, talentId }: Props) => {
  const { currentStep, hasPendingAssignment } = useCandidateSendingContext()

  const { roleTitle, loading: roleTitleLoading } = useGetRoleTitle({
    jobId,
    talentId
  })

  const roleTitlePrefix = hasPendingAssignment ? 'Assign' : 'Send'

  return (
    <ContentWrapper
      titleLoading={roleTitleLoading}
      additionalStatusMessages={<AdditionalStatusMessages />}
      title={
        !roleTitleLoading
          ? `${roleTitlePrefix} ${roleTitle} to Position`
          : undefined
      }
    >
      <Container bottom={3.5} css={S.container}>
        <CandidateSendingWizardSection
          roleName={roleTitle}
          roleNameLoading={roleTitleLoading}
        />
        <ContentStatusMessage />

        {currentStep === NewEngagementWizardStep.POSITION && (
          <CandidateSendingPositionStep />
        )}

        {currentStep === NewEngagementWizardStep.SKILLS && (
          <CandidateSendingSkillsStep />
        )}

        {currentStep === NewEngagementWizardStep.AVAILABILITY && (
          <CandidateSendingAvailabilityStep />
        )}

        {currentStep === NewEngagementWizardStep.DETAILS && (
          <CandidateSendingDetailsStep />
        )}

        {currentStep === NewEngagementWizardStep.PITCH && (
          <CandidateSendingPitchStep />
        )}

        {currentStep === NewEngagementWizardStep.FEEDBACK && (
          <CandidateSendingFeedbackStep />
        )}

        {currentStep === NewEngagementWizardStep.NEXT && (
          <CandidateSendingNextStep />
        )}
      </Container>
    </ContentWrapper>
  )
}

export default CandidateSendingPageContent
