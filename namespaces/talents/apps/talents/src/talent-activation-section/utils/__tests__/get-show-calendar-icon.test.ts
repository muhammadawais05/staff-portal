import { StepType } from '@staff-portal/graphql/staff'
import { createStaff } from '@staff-portal/talents/src/mocks'

import { createStep } from '../../test-utils'
import { getShowCalendarIcon } from '../get-show-calendar-icon'

const profileCreationStepFinished = true

const arrangeTest = () => ({
  unassignedStepInReviewCall: createStep({ type: StepType.REVIEW_CALL }),
  assignedStepInReviewCall: createStep({
    type: StepType.REVIEW_CALL,
    staff: createStaff()
  }),
  notReviewCallSteps: Object.keys(StepType).filter(
    type => type !== StepType.REVIEW_CALL
  ) as StepType[]
})

describe('getShowCalendarIcon', () => {
  it('shows calendar when step is review call, profile creation step has finished and nobody is assigned to this step', () => {
    const { unassignedStepInReviewCall } = arrangeTest()

    expect(
      getShowCalendarIcon(
        unassignedStepInReviewCall,
        profileCreationStepFinished
      )
    ).toBeTruthy()
  })

  it('does not show calendar when step is not review call', () => {
    const { notReviewCallSteps } = arrangeTest()

    notReviewCallSteps.forEach(type =>
      expect(
        getShowCalendarIcon(createStep({ type }), profileCreationStepFinished)
      ).toBeFalsy()
    )
  })

  it('does not show calendar when profile creation has not finished yet', () => {
    const { unassignedStepInReviewCall } = arrangeTest()

    expect(
      getShowCalendarIcon(
        unassignedStepInReviewCall,
        !profileCreationStepFinished
      )
    ).toBeFalsy()
  })

  it('does not show calendar when step has someone assigned already', () => {
    const { assignedStepInReviewCall } = arrangeTest()

    expect(
      getShowCalendarIcon(assignedStepInReviewCall, profileCreationStepFinished)
    ).toBeFalsy()
  })
})
