import { act, renderHook } from '@testing-library/react-hooks'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import useHandleCandidateSendingSteps from './use-handle-candidate-sending-steps'
import { CandidateSendingStepDirection } from '../../enums'

describe('useHandleCandidateSendingSteps', () => {
  it('sets `currentStep` and `actualSteps`', () => {
    const initialStep = NewEngagementWizardStep.POSITION
    const initialActualSteps = [NewEngagementWizardStep.POSITION]

    const { result } = renderHook(() =>
      useHandleCandidateSendingSteps({
        initialStep,
        initialActualSteps
      })
    )

    expect(result.current.currentStep).toBe(NewEngagementWizardStep.POSITION)
    expect(result.current.actualSteps).toEqual([
      NewEngagementWizardStep.POSITION
    ])
  })

  it('returns memoized initial steps', () => {
    const initialStep = NewEngagementWizardStep.POSITION
    const initialActualSteps = [
      NewEngagementWizardStep.POSITION,
      NewEngagementWizardStep.AVAILABILITY
    ]
    const firstInitialSteps = undefined
    const secondInitialSteps = [
      NewEngagementWizardStep.POSITION,
      NewEngagementWizardStep.SKILLS,
      NewEngagementWizardStep.AVAILABILITY
    ]
    const thirdInitialSteps = [
      NewEngagementWizardStep.POSITION,
      NewEngagementWizardStep.AVAILABILITY
    ]

    const { result, rerender } = renderHook<
      {
        initialSteps: NewEngagementWizardStep[] | undefined
      },
      ReturnType<typeof useHandleCandidateSendingSteps>
    >(
      ({ initialSteps }) =>
        useHandleCandidateSendingSteps({
          initialStep,
          initialActualSteps,
          initialSteps
        }),
      {
        initialProps: {
          initialSteps: firstInitialSteps
        }
      }
    )

    expect(result.current.displayedSteps).toBeUndefined()
    expect(result.current.nextStep).toBeNull()

    rerender({
      initialSteps: secondInitialSteps
    })

    expect(result.current.displayedSteps).toEqual(secondInitialSteps)
    expect(result.current.nextStep).toBe(NewEngagementWizardStep.SKILLS)

    rerender({
      initialSteps: thirdInitialSteps
    })

    expect(result.current.displayedSteps).toEqual(secondInitialSteps)
    expect(result.current.nextStep).toBe(NewEngagementWizardStep.SKILLS)
  })

  describe('when on initial step', () => {
    it('returns valid `direction`, `previousStep`, `currentStep` and `nextStep`', () => {
      const initialStep = NewEngagementWizardStep.POSITION
      const initialActualSteps = [
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.AVAILABILITY
      ]
      const initialSteps = [
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.SKILLS,
        NewEngagementWizardStep.AVAILABILITY
      ]

      const { result } = renderHook(() =>
        useHandleCandidateSendingSteps({
          initialStep,
          initialActualSteps,
          initialSteps
        })
      )

      expect(result.current.direction).toBe(
        CandidateSendingStepDirection.Initial
      )
      expect(result.current.previousStep).toBeNull()
      expect(result.current.currentStep).toBe(NewEngagementWizardStep.POSITION)
      expect(result.current.nextStep).toBe(NewEngagementWizardStep.SKILLS)
    })
  })

  describe('when on intermediate step', () => {
    it('returns valid `previousStep`, `currentStep` and `nextStep`', () => {
      const initialStep = NewEngagementWizardStep.AVAILABILITY
      const initialActualSteps = [
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.AVAILABILITY,
        NewEngagementWizardStep.DETAILS
      ]
      const initialSteps = [
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.SKILLS,
        NewEngagementWizardStep.AVAILABILITY,
        NewEngagementWizardStep.DETAILS
      ]

      const { result } = renderHook(() =>
        useHandleCandidateSendingSteps({
          initialStep,
          initialActualSteps,
          initialSteps
        })
      )

      expect(result.current.previousStep).toBe(NewEngagementWizardStep.SKILLS)
      expect(result.current.currentStep).toBe(
        NewEngagementWizardStep.AVAILABILITY
      )
      expect(result.current.nextStep).toBe(NewEngagementWizardStep.DETAILS)
    })
  })

  describe('when on last step', () => {
    it('returns valid `previousStep`, `currentStep` and `nextStep`', () => {
      const initialStep = NewEngagementWizardStep.AVAILABILITY
      const initialActualSteps = [
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.AVAILABILITY
      ]
      const initialSteps = [
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.SKILLS,
        NewEngagementWizardStep.AVAILABILITY
      ]

      const { result } = renderHook(() =>
        useHandleCandidateSendingSteps({
          initialStep,
          initialActualSteps,
          initialSteps
        })
      )

      expect(result.current.previousStep).toBe(NewEngagementWizardStep.SKILLS)
      expect(result.current.currentStep).toBe(
        NewEngagementWizardStep.AVAILABILITY
      )
      expect(result.current.nextStep).toBeNull()
    })
  })

  describe('when go to previous step', () => {
    it('updates direction step', () => {
      const { result } = renderHook(() => useHandleCandidateSendingSteps({}))

      act(() => {
        result.current.setCurrentStep(NewEngagementWizardStep.AVAILABILITY)
      })
      act(() => {
        result.current.handleGoToPreviousStep([
          NewEngagementWizardStep.POSITION,
          NewEngagementWizardStep.AVAILABILITY
        ])
      })

      expect(result.current.direction).toBe(
        CandidateSendingStepDirection.Backward
      )
    })

    it('updates current step', () => {
      const { result } = renderHook(() => useHandleCandidateSendingSteps({}))

      act(() => {
        result.current.setCurrentStep(NewEngagementWizardStep.AVAILABILITY)
      })
      act(() => {
        result.current.handleGoToPreviousStep([
          NewEngagementWizardStep.POSITION,
          NewEngagementWizardStep.AVAILABILITY
        ])
      })

      expect(result.current.currentStep).toBe(NewEngagementWizardStep.POSITION)
    })

    it('updates actual steps', () => {
      const { result } = renderHook(() =>
        useHandleCandidateSendingSteps({
          initialActualSteps: []
        })
      )

      act(() => {
        result.current.setCurrentStep(NewEngagementWizardStep.AVAILABILITY)
      })
      act(() => {
        result.current.handleGoToPreviousStep([
          NewEngagementWizardStep.POSITION,
          NewEngagementWizardStep.AVAILABILITY
        ])
      })

      expect(result.current.actualSteps).toEqual([
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.AVAILABILITY
      ])
    })

    describe('when go to initial step', () => {
      it('returns valid `isInitialStep` flag for handler', () => {
        const { result } = renderHook(() => useHandleCandidateSendingSteps({}))

        act(() => {
          result.current.setCurrentStep(NewEngagementWizardStep.AVAILABILITY)
        })
        act(() => {
          const { isInitialStep } = result.current.handleGoToPreviousStep([
            NewEngagementWizardStep.POSITION,
            NewEngagementWizardStep.AVAILABILITY
          ])

          expect(isInitialStep).toBe(true)
        })
      })
    })

    describe('when go to non-initial step', () => {
      it('returns valid `isInitialStep` flag for handler', () => {
        const { result } = renderHook(() => useHandleCandidateSendingSteps({}))

        act(() => {
          result.current.setCurrentStep(NewEngagementWizardStep.DETAILS)
        })
        act(() => {
          const { isInitialStep } = result.current.handleGoToPreviousStep([
            NewEngagementWizardStep.POSITION,
            NewEngagementWizardStep.AVAILABILITY,
            NewEngagementWizardStep.DETAILS
          ])

          expect(isInitialStep).toBe(false)
        })
      })
    })
  })

  describe('when go to next step', () => {
    it('updates direction', () => {
      const { result } = renderHook(() => useHandleCandidateSendingSteps({}))

      act(() => {
        result.current.setCurrentStep(NewEngagementWizardStep.POSITION)
      })
      act(() => {
        result.current.handleGoToNextStep([
          NewEngagementWizardStep.POSITION,
          NewEngagementWizardStep.AVAILABILITY
        ])
      })

      expect(result.current.direction).toBe(
        CandidateSendingStepDirection.Forward
      )
    })

    it('updates current step', () => {
      const { result } = renderHook(() => useHandleCandidateSendingSteps({}))

      act(() => {
        result.current.setCurrentStep(NewEngagementWizardStep.POSITION)
      })
      act(() => {
        result.current.handleGoToNextStep([
          NewEngagementWizardStep.POSITION,
          NewEngagementWizardStep.AVAILABILITY
        ])
      })

      expect(result.current.currentStep).toBe(
        NewEngagementWizardStep.AVAILABILITY
      )
    })

    it('updates actual steps', () => {
      const { result } = renderHook(() =>
        useHandleCandidateSendingSteps({
          initialActualSteps: []
        })
      )

      act(() => {
        result.current.setCurrentStep(NewEngagementWizardStep.POSITION)
      })
      act(() => {
        result.current.handleGoToNextStep([
          NewEngagementWizardStep.POSITION,
          NewEngagementWizardStep.AVAILABILITY
        ])
      })

      expect(result.current.actualSteps).toEqual([
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.AVAILABILITY
      ])
    })
  })
})
