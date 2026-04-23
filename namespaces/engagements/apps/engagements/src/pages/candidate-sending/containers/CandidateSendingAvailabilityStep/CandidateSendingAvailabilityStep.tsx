import {
  EngagementCommitmentEnum,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'
import { Container } from '@toptal/picasso'
import React, { useCallback } from 'react'
import {
  useMessageEmitter,
  useMessageListener
} from '@toptal/staff-portal-message-bus'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'

import { CandidateCommitmentDetailsSection } from '../../components'
import {
  useCandidateSendingContext,
  useGetAvailabilityStepTalentAvailabilityData,
  useGetCandidateSendingDataForAvailabilityStep
} from '../../hooks'
import CandidateSendingForm from '../CandidateSendingForm'
import CandidateSendingJobSection from '../CandidateSendingJobSection'
import CandidateSendingTalentSection from '../CandidateSendingTalentSection'
import CandidateSendingTalentAvailabilitySection from '../CandidateSendingTalentAvailabilitySection'
import ParallelInterviewsSection from '../ParallelInterviewsSection'
import { AVAILABILITY_STEP_FORM_UPDATE } from '../../messages'
import {
  getInitialValues,
  getValuesOnAvailabilityStepQueryComplete
} from './utils'
import { CandidateSendingStepsAttributesByStep } from '../../types'

const CandidateSendingAvailabilityStep = () => {
  const emitMessage = useMessageEmitter()
  const {
    talentId,
    currentStep,
    stepsAttributes,
    stepAttributesForCurrentStep,
    hasPendingAssignment,
    setStepAttributes
  } = useCandidateSendingContext()

  const {
    data: availabilityStepData,
    loading: availabilityStepDataLoading,
    refetch: refetchAvailabilityStepData
  } = useGetCandidateSendingDataForAvailabilityStep(
    stepsAttributes,
    (data, isRefetching) => {
      if (!data?.newEngagementWizard) {
        return
      }

      emitMessage(
        AVAILABILITY_STEP_FORM_UPDATE,
        getValuesOnAvailabilityStepQueryComplete({
          availabilityStepData: data.newEngagementWizard,
          isRefetching,
          hasPendingAssignment
        })
      )
    }
  )

  const {
    data: availabilityData,
    loading: availabilityDataLoading,
    refetch: refetchAvailabilityData
  } = useGetAvailabilityStepTalentAvailabilityData({
    attributes: stepsAttributes,
    skip: !talentId
  })

  useMessageListener(TALENT_UPDATED, ({ talentId: id }) => {
    if (id === talentId) {
      // We should always call these queries with actual step attributes
      refetchAvailabilityStepData({ attributes: stepsAttributes })
      refetchAvailabilityData({ attributes: stepsAttributes })
    }
  })

  const handleCommitmentChange = useCallback(
    (commitment?: EngagementCommitmentEnum) => {
      const updatedStepsAttributes = setStepAttributes(
        currentStep as keyof CandidateSendingStepsAttributesByStep,
        {
          ...stepAttributesForCurrentStep,
          commitment
        }
      )

      refetchAvailabilityStepData({
        attributes: updatedStepsAttributes
      })
    },
    [
      currentStep,
      stepAttributesForCurrentStep,
      refetchAvailabilityStepData,
      setStepAttributes
    ]
  )

  return (
    <>
      <Container bottom='medium'>
        <CandidateSendingTalentSection />
      </Container>

      <Container bottom='medium'>
        <CandidateSendingJobSection />
      </Container>

      <Container bottom='medium'>
        <CandidateSendingTalentAvailabilitySection
          availabilityData={availabilityData}
          availabilityDataLoading={availabilityDataLoading}
        />
      </Container>

      {!!availabilityStepData?.parallelEngagements.nodes.length && (
        <Container bottom='medium'>
          <ParallelInterviewsSection
            parallelEngagements={availabilityStepData.parallelEngagements.nodes}
            parallelEngagementsLoading={availabilityDataLoading}
          />
        </Container>
      )}

      <Container>
        {availabilityStepDataLoading ? (
          <SectionWithDetailedListSkeleton
            title='Engagement Commitment Details'
            columns={1}
            items={5}
            labelColumnWidth={10}
          />
        ) : (
          <CandidateSendingForm<NewEngagementWizardStep.AVAILABILITY>
            initialValues={getInitialValues({
              availabilityStepData,
              hasPendingAssignment
            })}
            destroyOnUnregister
          >
            <CandidateCommitmentDetailsSection
              commitmentDetailsData={availabilityStepData}
              availabilityData={availabilityData}
              availabilityDataLoading={availabilityStepDataLoading}
              onCommitmentChange={handleCommitmentChange}
            />
          </CandidateSendingForm>
        )}
      </Container>
    </>
  )
}

export default CandidateSendingAvailabilityStep
