import { StepOperation } from '../../types'
import { getSecondaryOperationButtonLabel } from '../get-secondary-operation-button-label'

describe('getSecondaryOperationButtonLabel', () => {
  it('returns reset label', () => {
    expect(
      getSecondaryOperationButtonLabel(StepOperation.Reset)
    ).toMatchInlineSnapshot(`"Reset Step"`)
  })

  it('returns re-assign label', () => {
    expect(
      getSecondaryOperationButtonLabel(StepOperation.Reassign)
    ).toMatchInlineSnapshot(`"Reassign Step"`)
  })

  it('returns un-assign label', () => {
    expect(
      getSecondaryOperationButtonLabel(StepOperation.Unassign)
    ).toMatchInlineSnapshot(`"Unclaim Step"`)
  })

  it('returns MBP Invitation label', () => {
    expect(
      getSecondaryOperationButtonLabel(StepOperation.SendIntroductionEmail)
    ).toMatchInlineSnapshot(`"Send Email: MBP Invitation"`)
  })

  it('returns MBP Reschedule label', () => {
    expect(
      getSecondaryOperationButtonLabel(StepOperation.SendRescheduleEmail)
    ).toMatchInlineSnapshot(`"Send Email: MBP Reschedule"`)
  })

  it('returns MBP Restoration label', () => {
    expect(
      getSecondaryOperationButtonLabel(StepOperation.SendRestorationEmail)
    ).toMatchInlineSnapshot(`"Send Email: MBP Restoration"`)
  })
})
