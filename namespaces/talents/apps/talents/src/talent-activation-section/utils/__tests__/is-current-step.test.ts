import { StepStatus } from '@staff-portal/graphql/staff'

import { createStep } from '../../test-utils'
import { isCurrentStep } from '../is-current-step'

describe('isCurrentStep', () => {
  it('returns true when step status is waiting for applicant action', () => {
    expect(
      isCurrentStep(createStep({ status: StepStatus.PENDING_APPLICANT_ACTION }))
    ).toBeTruthy()
  })

  it('returns true when step status is waiting for staff action', () => {
    expect(
      isCurrentStep(createStep({ status: StepStatus.PENDING_STAFF_ACTION }))
    ).toBeTruthy()
  })

  it('returns false when step status is in another status', () => {
    const NON_IN_PROGRESS_STATUSES = Object.keys(StepStatus).filter(
      type =>
        type !== StepStatus.PENDING_APPLICANT_ACTION &&
        type !== StepStatus.PENDING_STAFF_ACTION
    ) as StepStatus[]

    NON_IN_PROGRESS_STATUSES.forEach(status => {
      expect(isCurrentStep(createStep({ status }))).toBeFalsy()
    })
  })
})
