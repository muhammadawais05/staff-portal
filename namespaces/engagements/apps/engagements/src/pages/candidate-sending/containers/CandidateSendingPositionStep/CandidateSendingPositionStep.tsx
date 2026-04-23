import React from 'react'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'
import { Container, Section, SkeletonLoader } from '@toptal/picasso'

import CandidateSendingForm from '../CandidateSendingForm'
import CandidateSendingJobSection from '../CandidateSendingJobSection'
import CandidateSendingTalentSection from '../CandidateSendingTalentSection'
import CandidateSendingPositionStepForm from '../CandidateSendingPositionStepForm'
import {
  useCandidateSendingContext,
  useGetCandidateSendingDataForPositionStep
} from '../../hooks'
import { RelatedJobApplicationSection, InfoSection } from '../../components'
import { useGetSectionInfoText } from './hooks'

const CandidateSendingPositionStep = () => {
  const {
    queryParametersJobId,
    queryParametersTalentId,
    jobId,
    talentId,
    stepsAttributes
  } = useCandidateSendingContext()
  const { data, loading } =
    useGetCandidateSendingDataForPositionStep(stepsAttributes)
  const { job, talent, relatedJobApplication } = data?.newEngagementWizard || {}
  const sectionInfoText = useGetSectionInfoText(stepsAttributes)

  return (
    <CandidateSendingForm<NewEngagementWizardStep.POSITION>
      initialValues={{
        jobId,
        talentId
      }}
    >
      {relatedJobApplication && (
        <Container bottom='medium'>
          <RelatedJobApplicationSection
            relatedJobApplication={relatedJobApplication}
          />
        </Container>
      )}

      {sectionInfoText && <InfoSection>{sectionInfoText}</InfoSection>}

      {queryParametersJobId && (
        <Container bottom='medium'>
          <CandidateSendingJobSection />
        </Container>
      )}

      {queryParametersTalentId && (
        <Container bottom='medium'>
          <CandidateSendingTalentSection />
        </Container>
      )}

      {loading ? (
        <Section
          variant='withHeaderBar'
          title={<SkeletonLoader.Typography />}
          data-testid='candidate-sending-position-form-skeleton'
        >
          <SkeletonLoader.Typography />
        </Section>
      ) : (
        <CandidateSendingPositionStepForm job={job} talent={talent} />
      )}
    </CandidateSendingForm>
  )
}

export default CandidateSendingPositionStep
