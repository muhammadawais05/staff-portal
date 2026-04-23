import {
  NewEngagementWizardAttributes,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'

import {
  CandidateSendingPersistedStepsAttributesByStep,
  CandidateSendingStepAttributes,
  CandidateSendingStepsAttributesByStep
} from '../../types'
import { CandidateSendingStepDirection } from '../../enums'
import { SubmitNewEngagementWizardPayloadFragment } from '../../data/submit-new-engagement-wizard'

export type CandidateSendingContextType = {
  refetchInitialStepData: () => void

  // value from the query parameters
  queryParametersJobId: string | null
  // resolved value
  jobId: string | null

  // value from the query parameters
  queryParametersTalentId: string | null
  // resolved value
  talentId: string | null
  talentName: string | undefined
  setTalentName: (name: string) => void

  // value from the query parameters
  queryParametersEngagementId: string | null

  // value from the query parameters
  hasPendingAssignment: boolean

  initialLoading: boolean

  actualSteps: NewEngagementWizardStep[]
  displayedSteps: NewEngagementWizardStep[]

  direction: CandidateSendingStepDirection
  previousStep: NewEngagementWizardStep | null
  currentStep: NewEngagementWizardStep | null
  nextStep: NewEngagementWizardStep | null
  setCurrentStep: (step: NewEngagementWizardStep) => void
  goToNextStep: (newActualSteps: NewEngagementWizardStep[]) => void
  goToPreviousStep: (newActualSteps: NewEngagementWizardStep[]) => {
    isInitialStep: boolean
  }

  clientId: string | null
  setClientId: (id: string | null) => void

  clientName: string | undefined
  setClientName: (name?: string) => void

  newEngagementId: string | null
  setNewEngagementId: (id: string | null) => void

  newEngagementWizardMutationPayload?: SubmitNewEngagementWizardPayloadFragment | null
  setNewEngagementWizardMutationPayload: (
    data?: SubmitNewEngagementWizardPayloadFragment | null
  ) => void

  stepsAttributes: NewEngagementWizardAttributes
  stepAttributesForCurrentStep:
    | CandidateSendingStepsAttributesByStep[keyof CandidateSendingStepsAttributesByStep]
    | null
  setStepAttributes: <
    TStep extends keyof CandidateSendingStepsAttributesByStep
  >(
    step: TStep,
    stepAttributes: CandidateSendingStepAttributes<TStep>
  ) => NewEngagementWizardAttributes

  persistedStepAttributesForCurrentStep:
    | CandidateSendingPersistedStepsAttributesByStep[keyof CandidateSendingPersistedStepsAttributesByStep]
    | null
  setPersistedStepAttributes: <
    TStep extends keyof CandidateSendingPersistedStepsAttributesByStep
  >(
    step: TStep,
    stepAttributes: CandidateSendingStepAttributes<TStep>
  ) => void
}
