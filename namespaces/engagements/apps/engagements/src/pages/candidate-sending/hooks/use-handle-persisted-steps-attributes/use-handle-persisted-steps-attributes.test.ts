import { renderHook, act } from '@testing-library/react-hooks'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import useHandlePersistedStepsAttributes from './use-handle-persisted-steps-attributes'
import { CANDIDATE_SENDING_STEPS_CONFIG } from '../../config'

jest.mock('../../utils', () => ({
  adjustAvailabilityStepFormValues: jest.fn(),
  adjustDetailsStepFormValues: jest.fn(),
  adjustPitchStepFormValues: jest.fn(),
  adjustSkillsStepFormValues: jest.fn()
}))

describe('useHandlePersistedStepsAttributes', () => {
  describe('persistedStepAttributesForCurrentStep is null after initialization', () => {
    it('currentStep is null', () => {
      const { result } = renderHook(() =>
        useHandlePersistedStepsAttributes({ currentStep: null })
      )

      expect(result.current).toStrictEqual({
        persistedStepAttributesForCurrentStep: null,
        setPersistedStepAttributes: expect.any(Function)
      })
    })

    it('currentStep is not a persisted step', () => {
      const { result } = renderHook(() =>
        useHandlePersistedStepsAttributes({
          currentStep: NewEngagementWizardStep.AVAILABILITY
        })
      )

      expect(result.current).toStrictEqual({
        persistedStepAttributesForCurrentStep: null,
        setPersistedStepAttributes: expect.any(Function)
      })
    })

    it('currentStep is a persisted step', () => {
      const { result } = renderHook(() =>
        useHandlePersistedStepsAttributes({
          currentStep: NewEngagementWizardStep.PITCH
        })
      )

      expect(result.current).toStrictEqual({
        persistedStepAttributesForCurrentStep: null,
        setPersistedStepAttributes: expect.any(Function)
      })
    })
  })

  describe('setting step attrinutes', () => {
    it('is persistent step PITCH', () => {
      const { result } = renderHook(() =>
        useHandlePersistedStepsAttributes({
          currentStep: NewEngagementWizardStep.PITCH
        })
      )

      const persistedValue = {
        ccAdditional: [{ value: 'test' }],
        ccSuggested: ['cc'],
        ccExternal: [{ value: 'test' }],
        to: 'to'
      }

      act(() => {
        result.current.setPersistedStepAttributes(
          NewEngagementWizardStep.PITCH,
          persistedValue
        )
      })

      expect(
        result.current.persistedStepAttributesForCurrentStep
      ).toStrictEqual(persistedValue)
    })

    it('is not persisted step POSITION', () => {
      const { result } = renderHook(() =>
        useHandlePersistedStepsAttributes({
          currentStep: NewEngagementWizardStep.POSITION
        })
      )

      const persistedValue = {
        jobId: 'jobId',
        talentId: 'talentId',
        engagementId: 'engagementId'
      }

      act(() => {
        result.current.setPersistedStepAttributes(
          NewEngagementWizardStep.POSITION,
          persistedValue
        )
      })

      expect(result.current.persistedStepAttributesForCurrentStep).toBeNull()
    })
  })

  it('PITCH is the only persisted step', () => {
    expect(Object.keys(CANDIDATE_SENDING_STEPS_CONFIG)).toHaveLength(7)
    expect(CANDIDATE_SENDING_STEPS_CONFIG.PITCH.persistForm).toBeTruthy()

    expect(
      CANDIDATE_SENDING_STEPS_CONFIG.AVAILABILITY.persistForm
    ).toBeUndefined()
    expect(CANDIDATE_SENDING_STEPS_CONFIG.DETAILS.persistForm).toBeUndefined()
    expect(CANDIDATE_SENDING_STEPS_CONFIG.FEEDBACK.persistForm).toBeUndefined()
    expect(CANDIDATE_SENDING_STEPS_CONFIG.NEXT.persistForm).toBeUndefined()
    expect(CANDIDATE_SENDING_STEPS_CONFIG.POSITION.persistForm).toBeUndefined()
    expect(CANDIDATE_SENDING_STEPS_CONFIG.SKILLS.persistForm).toBeUndefined()
  })
})
