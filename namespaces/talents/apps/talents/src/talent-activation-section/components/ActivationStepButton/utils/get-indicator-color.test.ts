import { StepStatus, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { createStaff } from '@staff-portal/talents/src/mocks'

import { getIndicatorColor } from './get-indicator-color'
import { createStep } from '../../../test-utils'

const assignedToViewer = true
const arrangeTest = () => ({
  unassignedStep: createStep(),
  finishedStep: createStep({ status: StepStatus.FINISHED }),
  assignedStep: createStep({
    staff: createStaff(),
    operations: {
      assign: { callable: OperationCallableTypes.ENABLED, messages: [] }
    }
  }),
  pendingApplicantActionStep: createStep({
    status: StepStatus.PENDING_APPLICANT_ACTION
  }),
  pendingStaffActionStep: createStep({
    status: StepStatus.PENDING_STAFF_ACTION
  })
})

describe('getIndicatorColor', () => {
  it('returns positive for finished steps', () => {
    const { finishedStep } = arrangeTest()

    expect(getIndicatorColor(finishedStep, assignedToViewer)).toBe('green')
    expect(getIndicatorColor(finishedStep, !assignedToViewer)).toBe('green')
  })

  it('returns warning if step is assignable and is assigned to viewer', () => {
    const { assignedStep } = arrangeTest()

    expect(getIndicatorColor(assignedStep, assignedToViewer)).toBe('yellow')
  })

  it('returns primary if assigned to other user and the step is assigned to someone else', () => {
    const { assignedStep } = arrangeTest()

    expect(getIndicatorColor(assignedStep, !assignedToViewer)).toBe('blue')
  })

  it('returns light if step is un-assigned', () => {
    const { unassignedStep } = arrangeTest()

    expect(getIndicatorColor(unassignedStep, !assignedToViewer)).toBe(
      'light-grey'
    )
  })

  it('returns light for pending steps when activation', () => {
    const { pendingApplicantActionStep, pendingStaffActionStep } = arrangeTest()

    expect(
      getIndicatorColor(pendingApplicantActionStep, !assignedToViewer)
    ).toBe('light-grey')
    expect(getIndicatorColor(pendingStaffActionStep, !assignedToViewer)).toBe(
      'light-grey'
    )
  })
})
