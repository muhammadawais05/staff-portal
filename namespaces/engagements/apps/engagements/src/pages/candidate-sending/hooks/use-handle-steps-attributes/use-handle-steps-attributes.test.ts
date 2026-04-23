import { renderHook } from '@testing-library/react-hooks'
import {
  NewEngagementWizardStep,
  SkillVettingResult,
  EngagementCommitmentEnum
} from '@staff-portal/graphql/staff'

import useHandleStepsAttributes from './use-handle-steps-attributes'
import {
  CandidateSendingPitchStepAttributes,
  CandidateSendingDetailsStepAttributes
} from '../../types'

jest.mock('../../utils', () => ({
  adjustAvailabilityStepFormValues: jest.fn(),
  adjustDetailsStepFormValues: jest.fn(),
  adjustPitchStepFormValues: jest.fn(),
  adjustSkillsStepFormValues: jest.fn()
}))

describe('useHandleStepsAttributes', () => {
  it('has current step is null', () => {
    const { result } = renderHook(() =>
      useHandleStepsAttributes({
        currentStep: null,
        initialStepsAttributesByStep: {
          [NewEngagementWizardStep.POSITION]: null,
          [NewEngagementWizardStep.SKILLS]: null,
          [NewEngagementWizardStep.AVAILABILITY]: null,
          [NewEngagementWizardStep.DETAILS]: null,
          [NewEngagementWizardStep.PITCH]: null,
          [NewEngagementWizardStep.FEEDBACK]: null
        }
      })
    )

    expect(result.current).toStrictEqual({
      stepsAttributes: {},
      stepsAttributesByStep: {
        POSITION: null,
        SKILLS: null,
        AVAILABILITY: null,
        DETAILS: null,
        PITCH: null,
        FEEDBACK: null
      },
      stepAttributesForCurrentStep: null,
      setStepAttributes: expect.any(Function)
    })
  })

  it('has current step and initial attributes for it', () => {
    const { result } = renderHook(() =>
      useHandleStepsAttributes({
        currentStep: NewEngagementWizardStep.POSITION,
        initialStepsAttributesByStep: {
          [NewEngagementWizardStep.POSITION]: {
            jobId: 'jobId',
            talentId: 'talentId',
            engagementId: 'engagementId'
          },
          [NewEngagementWizardStep.SKILLS]: null,
          [NewEngagementWizardStep.AVAILABILITY]: null,
          [NewEngagementWizardStep.DETAILS]: null,
          [NewEngagementWizardStep.PITCH]: null,
          [NewEngagementWizardStep.FEEDBACK]: null
        }
      })
    )

    expect(result.current).toStrictEqual({
      stepsAttributes: {
        jobId: 'jobId',
        talentId: 'talentId',
        engagementId: 'engagementId'
      },
      stepsAttributesByStep: {
        POSITION: {
          jobId: 'jobId',
          talentId: 'talentId',
          engagementId: 'engagementId'
        },
        SKILLS: null,
        AVAILABILITY: null,
        DETAILS: null,
        PITCH: null,
        FEEDBACK: null
      },
      stepAttributesForCurrentStep: {
        jobId: 'jobId',
        talentId: 'talentId',
        engagementId: 'engagementId'
      },
      setStepAttributes: expect.any(Function)
    })
  })

  it('has current step and and initial attributes for another step', () => {
    const { result } = renderHook(() =>
      useHandleStepsAttributes({
        currentStep: NewEngagementWizardStep.DETAILS,
        initialStepsAttributesByStep: {
          [NewEngagementWizardStep.POSITION]: {
            jobId: 'jobId',
            talentId: 'talentId',
            engagementId: 'engagementId'
          },
          [NewEngagementWizardStep.SKILLS]: {
            skillVettingResult: SkillVettingResult.EXPERT,
            skillVettingComment: 'comment'
          },
          [NewEngagementWizardStep.AVAILABILITY]: null,
          [NewEngagementWizardStep.DETAILS]: null,
          [NewEngagementWizardStep.PITCH]: null,
          [NewEngagementWizardStep.FEEDBACK]: null
        }
      })
    )

    expect(result.current).toStrictEqual({
      stepsAttributes: {
        jobId: 'jobId',
        talentId: 'talentId',
        engagementId: 'engagementId'
      },
      stepsAttributesByStep: {
        POSITION: {
          jobId: 'jobId',
          talentId: 'talentId',
          engagementId: 'engagementId'
        },
        SKILLS: {
          skillVettingResult: SkillVettingResult.EXPERT,
          skillVettingComment: 'comment'
        },
        AVAILABILITY: null,
        DETAILS: null,
        PITCH: null,
        FEEDBACK: null
      },
      stepAttributesForCurrentStep: null,
      setStepAttributes: expect.any(Function)
    })
  })

  it('checks all possible steps attributes', () => {
    const { result } = renderHook(() =>
      useHandleStepsAttributes({
        currentStep: NewEngagementWizardStep.DETAILS,
        initialStepsAttributesByStep: {
          [NewEngagementWizardStep.POSITION]: {
            jobId: 'jobId',
            talentId: 'talentId',
            engagementId: 'engagementId'
          },
          [NewEngagementWizardStep.SKILLS]: {
            skillVettingResult: SkillVettingResult.EXPERT,
            skillVettingComment: 'comment'
          },
          [NewEngagementWizardStep.AVAILABILITY]: {
            availabilityConfirmed: true,
            acceptLowerCommitment: true,
            commitment: EngagementCommitmentEnum.FULL_TIME,
            hasPendingAssignment: true,
            highPriorityLockAcquired: true,
            lockOverrideReason: 'reason',
            trialLength: 5
          },
          [NewEngagementWizardStep.DETAILS]: {
            billCycleConfirmed: true,
            markup: 'blah'
          } as CandidateSendingDetailsStepAttributes,
          [NewEngagementWizardStep.PITCH]: {
            ccAdditional: [{ value: 'test' }],
            ccSuggested: ['cc'],
            ccExternal: [{ value: 'test' }],
            to: 'to'
          } as CandidateSendingPitchStepAttributes,
          [NewEngagementWizardStep.FEEDBACK]: {}
        }
      })
    )

    expect(result.current).toStrictEqual({
      stepsAttributes: {
        jobId: 'jobId',
        talentId: 'talentId',
        engagementId: 'engagementId'
      },
      stepsAttributesByStep: {
        POSITION: {
          jobId: 'jobId',
          talentId: 'talentId',
          engagementId: 'engagementId'
        },
        SKILLS: {
          skillVettingResult: SkillVettingResult.EXPERT,
          skillVettingComment: 'comment'
        },
        AVAILABILITY: {
          availabilityConfirmed: true,
          acceptLowerCommitment: true,
          commitment: EngagementCommitmentEnum.FULL_TIME,
          hasPendingAssignment: true,
          highPriorityLockAcquired: true,
          lockOverrideReason: 'reason',
          trialLength: 5
        },
        DETAILS: {
          billCycleConfirmed: true,
          markup: 'blah'
        },
        PITCH: {
          ccAdditional: [{ value: 'test' }],
          ccSuggested: ['cc'],
          ccExternal: [{ value: 'test' }],
          to: 'to'
        },
        FEEDBACK: {}
      },
      stepAttributesForCurrentStep: {
        billCycleConfirmed: true,
        markup: 'blah'
      },
      setStepAttributes: expect.any(Function)
    })
  })
})
