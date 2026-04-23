import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import {
  getResolvedJobId,
  getResolvedTalentId
} from './utils/get-resolved-ids/get-resolved-ids'
import { CandidateSendingContextType } from './types'
import {
  useGetCandidateSendingDataForInitialStep,
  useHandleCandidateSendingSteps,
  useHandlePersistedStepsAttributes,
  useHandleStepsAttributes
} from '../../hooks'
import { SubmitNewEngagementWizardPayloadFragment } from '../../data/submit-new-engagement-wizard'

export const CandidateSendingContext =
  createContext<CandidateSendingContextType>(
    undefined as unknown as CandidateSendingContextType
  )

export interface Props {
  children: ReactNode
  jobId?: string
  talentId?: string
  engagementId?: string
  hasPendingAssignment?: boolean
}

const CandidateSendingProvider = ({
  children,
  jobId: queryParametersJobId,
  talentId: queryParametersTalentId,
  engagementId: queryParametersEngagementId,
  hasPendingAssignment = false
}: Props) => {
  const {
    initialSteps,
    initialActualSteps,
    initialStep,
    initialLoading,
    initialJobId,
    initialTalentId,
    initialClientId,
    refetchInitialStepData
  } = useGetCandidateSendingDataForInitialStep({
    attributes: {
      jobId: queryParametersJobId,
      talentId: queryParametersTalentId,
      engagementId: queryParametersEngagementId
    }
  })

  const [clientId, setClientId] = useState<string | null>(null)
  const [clientName, setClientName] = useState<string | undefined>(undefined)
  const [talentName, setTalentName] = useState<string | undefined>(undefined)
  const [newEngagementId, setNewEngagementId] = useState<string | null>(null)
  const [
    newEngagementWizardMutationPayload,
    setNewEngagementWizardMutationPayload
  ] = useState<SubmitNewEngagementWizardPayloadFragment | null | undefined>(
    null
  )

  useEffect(() => {
    if (initialClientId) {
      setClientId(initialClientId)
    }
  }, [initialClientId, setClientId])

  const {
    displayedSteps,
    actualSteps,

    direction,
    previousStep,
    currentStep,
    nextStep,

    setCurrentStep,

    handleGoToNextStep,
    handleGoToPreviousStep
  } = useHandleCandidateSendingSteps({
    initialSteps,
    initialActualSteps,
    initialStep
  })

  const {
    stepsAttributes,
    stepsAttributesByStep,
    stepAttributesForCurrentStep,
    setStepAttributes
  } = useHandleStepsAttributes({
    currentStep,
    initialStepsAttributesByStep: {
      [NewEngagementWizardStep.POSITION]: {
        // We have to initialize `jobId`, `talentId` and `engagementId` based on values from the query parameters
        jobId: queryParametersJobId,
        talentId: queryParametersTalentId,
        engagementId: queryParametersEngagementId
      },
      [NewEngagementWizardStep.SKILLS]: null,
      [NewEngagementWizardStep.AVAILABILITY]: null,
      [NewEngagementWizardStep.DETAILS]: null,
      [NewEngagementWizardStep.PITCH]: null,
      [NewEngagementWizardStep.FEEDBACK]: null
    }
  })

  const { persistedStepAttributesForCurrentStep, setPersistedStepAttributes } =
    useHandlePersistedStepsAttributes({ currentStep })

  const resolvedJobId = getResolvedJobId(stepsAttributesByStep, initialJobId)
  const resolvedTalentId = getResolvedTalentId(
    stepsAttributesByStep,
    initialTalentId
  )

  return (
    <CandidateSendingContext.Provider
      value={{
        refetchInitialStepData,

        queryParametersJobId: queryParametersJobId ?? null,
        jobId: resolvedJobId,

        queryParametersTalentId: queryParametersTalentId ?? null,
        talentId: resolvedTalentId,

        talentName,
        setTalentName,

        queryParametersEngagementId: queryParametersEngagementId ?? null,

        hasPendingAssignment,

        clientId,
        setClientId,

        clientName,
        setClientName,

        newEngagementId,
        setNewEngagementId,

        newEngagementWizardMutationPayload,
        setNewEngagementWizardMutationPayload,

        initialLoading,

        actualSteps: actualSteps ?? [],
        displayedSteps: displayedSteps ?? [],

        direction,
        previousStep,
        currentStep,
        nextStep,
        setCurrentStep,
        goToNextStep: handleGoToNextStep,
        goToPreviousStep: handleGoToPreviousStep,

        stepsAttributes,
        stepAttributesForCurrentStep,
        setStepAttributes,

        persistedStepAttributesForCurrentStep,
        setPersistedStepAttributes
      }}
    >
      {children}
    </CandidateSendingContext.Provider>
  )
}

export default CandidateSendingProvider
